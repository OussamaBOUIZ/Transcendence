
import { BaseEntity, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm"
import { Achievement } from "./achievement/achievement.entity"
import {User} from "./user.entity";

@Entity('Stats')
export class Stats extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @OneToMany(() => Achievement, (achievement) => achievement.stat, {nullable: true})
    achievements: Achievement[]
    
    @Column({default: 0})
    wins: number

    @Column({default: 0})
    consecutive_wins: number

    @Column({default: 0})
    losses: number

    @OneToOne(() => User, (user) => user.stat)
    user: User

    @Column({default: 0})
    xp: number
 
    @Column({default: 0})
    ladder_level: number

    @Column({default: 0, type: 'decimal', precision: 10, scale: 2})
    levelPercentage: number
}
