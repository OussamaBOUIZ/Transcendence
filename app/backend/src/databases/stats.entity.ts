
import { BaseEntity, CannotAttachTreeChildrenEntityError, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm"
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

    @OneToOne(() => User, (user) => user.stat)
    user: User
    
    @Column({default: 0})
    losses: number

    @Column({nullable: true})
    xp: number

    @Column({default: 0})
    ladder_level: number
}
