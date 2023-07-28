
import { BaseEntity, CannotAttachTreeChildrenEntityError, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm"
import { Achievement } from "./achievement.entity"

@Entity('Stats')
export class Stats extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number
    
    // unidirectional
    @OneToMany(() => Achievement, (achievement) => achievement.stat, {nullable: true})
    achievements: Achievement[]
    
    @Column()
    wins: number

    @Column()
    losses: number

    @Column({default: 0})
    xp: number

    @Column({default: 0})
    ladder_level: number
}
