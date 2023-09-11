import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./user.entity";

@Entity('game')
export class Game extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @OneToOne(() => User)
    @JoinColumn()
    user1: User

    @OneToOne(() => User)
    @JoinColumn()
    user2: User

    @Column({default: 0})
    userShots: number

    @Column({default: 0})
    opponentShots: number
}
