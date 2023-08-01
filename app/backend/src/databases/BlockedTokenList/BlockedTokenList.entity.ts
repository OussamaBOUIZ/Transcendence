import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class BlockedTokenList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @Column({ type: 'timestamp' })
  expiresAt: Date;
}
