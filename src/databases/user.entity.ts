import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm"
import {Inbox_user} from "./inbox_user.entity";
import {User_chat} from "./userchat.entity";


@Entity('User')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: true})
    socketId: string

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

    @OneToMany(() => User_chat, (user_char) => user_char.user)
    user_chat: User_chat[]

    @OneToMany(() => Inbox_user, (inbox_user) => inbox_user.user)
    inbox_users: Inbox_user[]

    @Column({type: 'boolean', default: false})
    is_two_factor: boolean


}

/*
    const user1 = new User();
    const Friend1 = new Friend();
    const Friend2 = new Friend();
    user1.friends = [friend1, friend2];
    const user2 = new User();
 */
