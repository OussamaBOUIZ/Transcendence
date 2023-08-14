import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Channel } from "./channel.entity"

@Entity('Muted_users')
export class Muted_users extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    user_id: number

    @ManyToOne(() => Channel, (channel) => channel.muted)
    channel: Channel
}
