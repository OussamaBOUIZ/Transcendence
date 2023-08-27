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

    @Column({nullable: true})
    channel_type: string

    @Column({nullable: true})
    channel_password: string

    @ManyToMany(() => User, (user) => user.userRoleChannels , {nullable: true})
    @JoinTable()
    channelUsers: User[]

    @ManyToMany(() => User, (user) => user.adminRoleChannels , {nullable: true})
    @JoinTable()
    channelAdmins: User[]

    @ManyToMany(() => User, (user) => user.ownerRoleChannels , {nullable: true})
    @JoinTable()
    channelOwners: User[]

    @ManyToMany(() => User, (user) => user.userBannedChannels, {nullable: true})
    @JoinTable()
    BannedUsers: User[]

    @OneToMany(() => Message, (messages) => messages.channel, {nullable: true})
    messages: Message[]

    @OneToMany(() => Muted_users, (muted_users) => muted_users.user_id, {nullable: true})
    muted: Muted_users[]
}
