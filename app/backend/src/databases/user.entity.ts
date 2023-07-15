import {BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm"
import {Inbox_user} from "./inbox/inbox_user.entity";
import {User_chat} from "./userchat/userchat.entity";
import { Friend } from "./friend.entity";
import { Channel } from "./channel.entity";
import { Match_history } from "./match_history.entity";
import { Stats } from "./stats.entity";


@Entity('User')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: true})
    socketId: string

    @Column({default: 'Offline'})
    status: string

    @Column({nullable: true})
    firstname: string

    @Column({nullable: true})
    lastname: string

    @Column({nullable: true})
    username: string

    @Column({nullable: true})
    password: string

    @Column({default: 'path', nullable: true})
    avatar: string

    @Column({unique: true, nullable: true})
    email: string

    @Column({ type: 'boolean', default: false })
    is_two_factor: boolean

    @ManyToOne (() => Friend, {nullable: true})
    @JoinTable()
    friends: Friend[]

    @Column('int', {array: true, nullable: true})
    blocked_users: number[]

    @ManyToOne(() => Channel, {nullable: true})
    @JoinTable()
    joined_channels: Channel[]

    @OneToOne(() => Stats, {nullable: true})
    @JoinColumn()
    stat: Stats

    @OneToMany(() => Match_history, (Match_history) => Match_history.user, {nullable: true})
    match_history: Match_history[]

    @OneToMany(() => User_chat, (user_char) => user_char.user)
    user_chat: User_chat[]

    @OneToMany(() => Inbox_user, (inbox_user) => inbox_user.user)
    inbox_users: Inbox_user[]
}

/*
    const user1 = new User();
    const Friend1 = new Friend();
    const Friend2 = new Friend();
    user1.friends = [friend1, friend2];
    const user2 = new User();
 */
