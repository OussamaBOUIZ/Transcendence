import { BaseEntity, CannotAttachTreeChildrenEntityError, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm"
import { Channel } from "./channel.entity"

@Entity('Muted_users')
export class Muted_users extends BaseEntity {
    // @PrimaryGeneratedColumn()
    // id: number

    // @Column()
    // user_id: number

    // @ManyToOne(() => Channel, (channel) => channel.muted)
    // channel: Channel

    // @Column()
    // ! timestamp 
}
