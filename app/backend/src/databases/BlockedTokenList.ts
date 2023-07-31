import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class TokenBlacklist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @Column({ type: 'timestamp' })
  expiresAt: Date;
}
