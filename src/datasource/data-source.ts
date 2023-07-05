import {User} from "src/databases/user.entity";
import {DataSource, DataSourceOptions} from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5434,
    username: 'postgres',
    password: '123',
    database: 'PingPong', //  PingPong
    entities: [User
    ],
    synchronize: true,
}

const dataSource = new DataSource(dataSourceOptions)
export default dataSource;