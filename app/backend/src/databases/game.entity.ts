import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm"
import { User } from "./user.entity";

@Entity('game')
export class Game extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    user1: number

    @Column()
    user2: number

    @Column({default: 0})
    userShots: number

    @Column({default: 0})
    opponentShots: number

    @CreateDateColumn()
    CreatedAt: Date
}