import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm"
import { Muted_users } from "./muted_users.entity"
import { Message } from "./message.entity"
import { User } from "./user.entity"

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

    @ManyToMany(() => User)
    @JoinTable()
    channelUsers: User[]

    @ManyToMany(() => User)
    @JoinTable()
    channelAdmins: User[]

    @ManyToMany(() => User)
    @JoinTable()
    channelOwners: User[]

    @ManyToMany(() => User)
    @JoinTable()
    BannedUsers: User[]

    @OneToMany(() => Message, (messages) => messages.channel)
    messages: Message[]

    @OneToMany(() => Muted_users, (muted_users) => muted_users.user_id)
    muted: Muted_users[]
}
