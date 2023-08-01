import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm"
import { Muted_users } from "./muted_users.entity"
import { Message } from "./message.entity"

@Entity('Channel')
export class Channel extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({unique: true})
    channel_name: string

    @Column()
    channel_type: string

    @Column({nullable: true})
    channel_password: string

    @Column('int', {array: true, nullable: true})
    channel_owners: number[]
    
    @Column('int', {array: true, nullable: true})
    channel_admins: number[]

    @Column('int', {array: true, nullable: true})
    channel_users: number[]

    @Column('int', {array: true, nullable: true})
    banned_users: number[]

    @OneToMany(() => Message, (messages) => messages.channel)
    messages: Message[]

    @OneToMany(() => Muted_users, (muted_users) => muted_users.user_id)
    muted: Muted_users[]
}
