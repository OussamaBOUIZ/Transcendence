
import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm"
import { User } from "./user.entity"


@Entity('Match_history')
export class Match_history extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @ManyToOne(() => User, (user) => user.match_history, {nullable: true})
    user: User

    @OneToOne(() => User, {nullable: true})
    @JoinColumn()
    opponent: User
    
    @Column()
    user_score: number

    @Column()
    opponent_score: number
    
}
