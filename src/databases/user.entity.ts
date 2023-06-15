import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm"


@Entity('User')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    name: string

    @Column()
    avatar: string

    @Column({ type: 'boolean', default: false })
    is_two_factor: boolean

}
