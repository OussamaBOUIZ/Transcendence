import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from "typeorm"
import {Inbox_user} from "./inbox_user.entity";
import {User_chat} from "./userchat.entity";
import { Match_history } from "./match_history.entity";
import { Stats } from "./stats.entity";
import {Exclude} from "class-transformer";


@Entity('User')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({nullable: true})
    socketId: string

    @Column({default: 'Offline'})
    status: string

    @Column({default: false})
    isActive: boolean

    @Column({nullable: true})
    firstname: string

    @Column({nullable: true })
    lastname: string

    @Column({nullable: true})
    username: string

    @Exclude()
    @Column({nullable: true})
    password: string

    @Column({default: 'path', nullable: true})
    avatar: string

    @Column({ type: 'boolean', default: true })
    firstLog: boolean

    @Column({unique: true, nullable: true})
    email: string

    @Column({ type: 'boolean', default: false})
    isEmailConfirmed: boolean

    @Column({ type: 'boolean', default: false })
    is_two_factor: boolean

    @Column({nullable: true})
    two_factor_secret: string

    @Column({nullable: true})
    otpPathUrl: string

    @ManyToMany(() => User, user => user.friends)
    @JoinTable()
    friends: User[];

    @ManyToMany(() => User, user => user.friends)
    friendOf: User[];

    @ManyToMany(type => User, user => user.blocked_users, {nullable: true})
    @JoinTable()
    blocked_users: User[]

    @OneToOne(() => Stats, (stats) => stats.user , {nullable: true})
    @JoinColumn()
    stat: Stats

    @OneToMany(() => Match_history, (Match_history) => Match_history.user, {nullable: true})
    match_history: Match_history[]

    @OneToMany(() => User_chat, (user_char) => user_char.user)
    user_chat: User_chat[]

    @OneToMany(() => Inbox_user, (inbox_user) => inbox_user.user)
    inbox_users: Inbox_user[]
}