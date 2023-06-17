import { BaseEntity, CannotAttachTreeChildrenEntityError, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm"

@Entity('Friend')
export class Friend extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    user_id: number
    
    @Column()
    status: string
}
