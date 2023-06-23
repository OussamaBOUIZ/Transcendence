import { Logger, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { HttpModule, HttpService } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/databases/user.entity';
import { googleStrategy } from './googleapi/googleStrategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { fortyTwoStrategy } from './42api/42Strategy';
import { JwtStrategy } from './jwt/jwtStrategy';
import { LocalStrategy } from './local/localStrategy';
const jwtFactory = {
  useFactory: async (configService: ConfigService) => ({
    global: true,
    secret: configService.get('JWT_SECRET'),
  }),
  inject: [ConfigService],
};
@Module({
  controllers: [AuthController],
  imports: [HttpModule, TypeOrmModule.forFeature([User]),
   JwtModule.registerAsync(jwtFactory),
],
  providers: [googleStrategy, AuthService, fortyTwoStrategy, JwtStrategy, LocalStrategy]
})
export class AuthModule {

}
