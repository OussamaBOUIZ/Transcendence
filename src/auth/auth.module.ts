import { Logger, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  controllers: [AuthController],
  imports: [HttpModule]
})
export class AuthModule {

}
