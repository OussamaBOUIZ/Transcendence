import {User} from "src/databases/user.entity";
import {DataSource, DataSourceOptions} from "typeorm";
import {Inbox_user} from "../databases/inbox_user.entity";
import {User_chat} from "../databases/userchat.entity";
import {Message} from "../databases/message.entity";

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5434,
    username: 'postgres',
    password: '123', // ! use .env file
    database: 'PingPong', //   PingPong
    entities: [User, Inbox_user, User_chat, Message],
    synchronize: true,
}
new DataSource(dataSourceOptions);
