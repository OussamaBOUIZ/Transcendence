import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stats } from './databases/stats.entity';
import { Achievement } from './databases/achievement.entity';
import { Match_history } from './databases/match_history.entity';
import { User } from './databases/user.entity';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5434,
    username: 'postgres',
    password: '123',
    database: 'postgres', //  PingPong
    entities: [User, Stats, Achievement, Match_history],
    synchronize: true,
  })
]
})
export class AppModule {}