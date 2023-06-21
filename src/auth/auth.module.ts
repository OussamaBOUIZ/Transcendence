import { Logger, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { HttpModule, HttpService } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/databases/user.entity';
import { googleStrategy } from './googleapi/googleStrategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  imports: [HttpModule, TypeOrmModule.forFeature([User])
  , JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET,
  })],
  providers: [googleStrategy]
})
export class AuthModule {

}
