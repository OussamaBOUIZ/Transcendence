import { BaseEntity, Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm"

@Entity('Channel')
export class User_chat extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    // @Column()
    // sender_id:  number

    // @Column()
    // receiver_id:  number

    // @Column()
    // messages: message[]
}

