import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from 'src/databases/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Achievement } from 'src/databases/achievement/achievement.entity';
import { Friend } from 'src/databases/friend.entity';

@Module({
  controllers: [UserController],
  providers: [UserService, JwtService],
  imports: [TypeOrmModule.forFeature([User, Achievement, Friend])]
})
export class UserModule {}
