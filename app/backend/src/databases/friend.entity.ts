import { BaseEntity, CannotAttachTreeChildrenEntityError, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm"

@Entity('Friend')
export class Friend extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    friend_id: number
    
    @Column()
    status: string

    @Column()
    friend_wins: number
}
