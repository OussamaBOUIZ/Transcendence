
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Stats } from "../stats.entity"

@Entity('Achievement')
export class Achievement extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number
    
    @ManyToOne(() => Stats , (stat) => stat.achievements, {nullable: true})
    stat: Stats
    
    @Column()
    badge_name: string

    @Column()
    description: string

    @Column({ type: 'boolean', default: false })
    is_achieved: boolean
    
    @Column({nullable: true})
    user_id: number
}
