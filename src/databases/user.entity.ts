import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm"


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


    @Column({type: 'boolean', default: false})
    is_two_factor: boolean

    // @ManyToOne(() => Friend)
    // @JoinTable()
    // friends: Friend[]

    // @Column('int', {array: true})
    // blocked_users: number[]

    // @ManyToOne(() => Channel)
    // @JoinTable()
    // joined_channels: Channel[]

    // @OneToOne(() => Stats)
    // @JoinColumn()
    // stat: Stats

    // @OneToMany(() => Match_history, (match_history) => match_history.user)
    // match_history: Match_history[]

    // @OneToMany(() => inbox_user, (inbox_user) => inbox_user.user)
    // inbox_users: inbox_user[]
}

/*
    const user1 = new User();
    const Friend1 = new Friend();
    const Friend2 = new Friend();
    user1.friends = [friend1, friend2];
    const user2 = new User();
 */
