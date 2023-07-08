import {User} from "src/databases/user.entity";
import {DataSource, DataSourceOptions} from "typeorm";
import {Inbox_user} from "../databases/inbox_user.entity";
import {User_chat} from "../databases/userchat.entity";
import {Message} from "../databases/message.entity";
import { Achievement } from "src/databases/achievement.entity";
import { Channel } from "src/databases/channel.entity";
import { Match_history } from "src/databases/match_history.entity";
import { Friend } from "src/databases/friend.entity";
import { Stats } from "src/databases/stats.entity";

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5434,
    username: 'postgres',
    password: '123',
    database: 'PingPong', //  PingPong
    entities: [
      Achievement, Channel,
       Friend, Match_history,
      //  Muted_users, 
       Stats,
       User, Inbox_user
       , User_chat, Message
    ],
    synchronize: true,
}
new DataSource(dataSourceOptions);
