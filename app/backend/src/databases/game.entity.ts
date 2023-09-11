import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./user.entity";

@Entity('game')
export class Game extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    user1: User;

    @Column()
    user2: User;

    @Column({default: 0})
    userShots: number

    @Column({default: 0})
    opponentShots: number
}
