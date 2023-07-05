import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { dataSourceOptions } from './datasource/data-source';
import { ChatGatewayModule } from './chat/userchat.module';



@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
    ChatGatewayModule,
    ConfigModule.forRoot({
      isGlobal: true,
    })
  ],
  providers: []
})
export class AppModule {}