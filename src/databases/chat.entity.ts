import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm"


@Entity('Chat')
export class Chat extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    channel_name: string

    @Column()
    channel_type: string

    
}
