
import { BaseEntity, CannotAttachTreeChildrenEntityError, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm"
import { Stats } from "./stats.entity"

@Entity('Achievement')
export class Achievement extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number
    
    // @OneToOne(() => User)
    // user: User
    
    @ManyToOne(() => Stats , (stat) => stat.achievements, {nullable: true})
    stat: Stats

    @Column()
    badge_icon: string
    
    @Column()
    badge_name: string

    @Column()
    description: string

    @Column({ type: 'boolean', default: false })
    is_achieved: boolean
    
    @Column()
    user_id: number
}
