import { Channel } from "diagnostics_channel";
import { Stats } from "fs";
import { Achievement } from "src/databases/achievement.entity";
import { Friend } from "src/databases/friend.entity";
import { Match_history } from "src/databases/match_history.entity";
import { Muted_users } from "src/databases/muted_users.entity";
import { User } from "src/databases/user.entity";
import { DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions ={
    type: 'postgres',
    host: 'localhost',
    port: 5434,
    username: 'postgres',
    password: '123',
    database: 'PingPong', //  PingPong
    entities: [Achievement, Channel,
       Friend, Match_history,
       Muted_users, Stats,
       User
    ],
    synchronize: true,
}