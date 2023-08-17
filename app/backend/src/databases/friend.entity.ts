import { BaseEntity, Entity } from "typeorm"
import { User } from "./user.entity"

@Entity('Friend')
export class Friend extends BaseEntity {
    // @PrimaryGeneratedColumn('increment')
    // id: number

    // @ManyToOne(() => User, (user) => user.friends , {nullable: true})
    // user: User

    // @Column()
    // friend_id: number

    // @Column({default: 'Offline'})
    // status: string

    // @Column({default: 0})
    // friend_wins: number

    // @Column({default: 0})
    // friend_losses: number
}
