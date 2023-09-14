import { Repository } from 'typeorm';
import { BlockedTokenList } from './BlockedTokenList.entity';
export declare class BlockedTokenlistService {
    private readonly BlockedListRepo;
    constructor(BlockedListRepo: Repository<BlockedTokenList>);
    blacklistToken(token: string, expiresInMilliseconds: number): Promise<void>;
    blackListHasToken(token: string): Promise<boolean>;
    cleanUpExpiredTokens(): Promise<void>;
}
