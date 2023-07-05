import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm"

@Entity('User_chat')
export class User_chat extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    sender_id: number

    @Column()
    messages: message[]
}

@Entity('message')
export class message extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    message: string

    @Column()
    CreatedAt: Date
}

