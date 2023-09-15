import {User} from "src/databases/user.entity";
import {DataSource, DataSourceOptions} from "typeorm";
import {Inbox_user} from "../databases/inbox_user.entity";
import {User_chat} from "../databases/userchat.entity";
import {Message} from "../databases/message.entity";
import { Achievement } from "src/databases/achievement/achievement.entity";
import { Channel } from "src/databases/channel.entity";
import { Match_history } from "src/databases/match_history.entity";
import { Stats } from "src/databases/stats.entity";
import { Muted_users } from "src/databases/muted_users.entity";
import { BlockedTokenList } from "src/databases/BlockedTokenList/BlockedTokenList.entity";
import { Game } from "src/databases/game.entity";

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5434,
    username: 'postgres',
    password: '123',
    database: 'PingPong', //  PingPong
    entities: [
      Achievement, Channel, 
      Match_history,
       Muted_users, 
       Stats, Game,
       User, Inbox_user
       , User_chat, Message
       , BlockedTokenList
    ],
    synchronize: true,

}
new DataSource(dataSourceOptions);
