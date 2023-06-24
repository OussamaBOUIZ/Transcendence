
import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm"
import { Friend } from "./friend.entity"
import { Channel } from "./channel.entity"
import { Stats } from "./stats.entity"
import { Match_history } from "./match_history.entity"


@Entity('User')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: true})
    socketId: string

    @Column({nullable: true })
    firstname: string
    
    @Column({ nullable: true })
    lastname: string
    
    @Column({ nullable: true })
    username: string

    @Column({nullable: true})
    password: string
    
    @Column({ default: 'path', nullable: true })
    avatar: string
    
    @Column({ unique: true, nullable: true })
    email: string



    @Column({ type: 'boolean', default: false })
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
}
