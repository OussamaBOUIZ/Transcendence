import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./user.entity"


@Entity('Match_history')
export class Match_history extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @ManyToOne(() => User, (user) => user.match_history, {nullable: true})
    user: User

    @Column({default: 0})
    opponent: number
    
    @Column({default: 0})
    user_score: number

    @Column({default: 0})
    opponent_score: number
    
 }