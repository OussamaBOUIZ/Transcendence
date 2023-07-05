import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('inbox_user')
export class inbox_user extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    sender_id: number

    @Column()
    lastMessage: string

    @Column()
    CreatedAt: Date

    @Column({default: 0})
    unseenMessages: number
}

