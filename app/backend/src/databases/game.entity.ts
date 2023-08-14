import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('game')
export class Game extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({default: 0})
    userShots: number

    @Column({default: 0})
    opponentShots: number
}
