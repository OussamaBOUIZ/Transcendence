// token-blacklist.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron } from '@nestjs/schedule';
import { Repository, LessThan } from 'typeorm';
import { BlockedTokenList } from './BlockedTokenList.entity';

@Injectable()
export class BlockedTokenlistService {
  constructor(
    @InjectRepository(BlockedTokenList) private readonly BlockedListRepo: Repository<BlockedTokenList>,
  ) {}

  async blacklistToken(token: string, expiresInMilliseconds: number): Promise<void> {
    const now = new Date();
    const expirationDate = new Date(now.getTime() + (expiresInMilliseconds));

    const tokenEntry = this.BlockedListRepo.create({
        token: token,
        expiresAt: expirationDate,
    });
  
    await this.BlockedListRepo.save(tokenEntry);
  }

  async blackListHasToken(token: string)
  {
    const tokenExist = await this.BlockedListRepo.findOne({
        where: {token: token},
    });
    if(!tokenExist) return false;
    return true;
  }
  @Cron('0 * * * *') 
  async cleanUpExpiredTokens(): Promise<void> {
    const now = new Date();
    await this.BlockedListRepo.delete({
      expiresAt: LessThan(now),
    });
  }
}
