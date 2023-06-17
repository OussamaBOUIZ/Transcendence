import { BaseEntity, CannotAttachTreeChildrenEntityError, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm"

@Entity('Muted_users')
export class Muted_users extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    user_id: number
    // ! timestamp 
}
