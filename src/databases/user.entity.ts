
import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm"
import { Stats } from "./stats.entity"
import { Match_history } from "./match_history.entity"


@Entity('User')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    unique_name: string

    @Column()
    avatar: string

    @Column({ type: 'boolean', default: false })
    is_two_factor: boolean

    @ManyToMany(() => User)
    @JoinTable()
    friends: User[]

    @Column('varchar', { array: true })
    friends_status: string[]

    @OneToOne(() => Stats)
    @JoinColumn()
    stat: Stats

    @OneToMany(() => Match_history, (match_history) => match_history.user)
    match_history: Match_history[]
}
