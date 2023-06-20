import { Logger, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { HttpModule, HttpService } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/databases/user.entity';
import { googleStrategy } from './googleapi/googleStrategy';

@Module({
  controllers: [AuthController],
  imports: [HttpModule, TypeOrmModule.forFeature([User])],
  providers: [googleStrategy]
})
export class AuthModule {

}
