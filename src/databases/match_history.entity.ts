
import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm"
import { User } from "./user.entity"


@Entity('Match_history')
export class Match_history extends BaseEntity {
    // @PrimaryGeneratedColumn()
    // id: number

    // @ManyToOne(() => User, (user) => user.match_history)
    // user: User

    // @OneToOne(() => User)
    // @JoinColumn()
    // opponent: User
    
    // @Column()
    // user_score: number

    // @Column()
    // opponent_score: number
    
}
