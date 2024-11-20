import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  VersionColumn,
  Index,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Timer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column({ default: false })
  isActive: boolean;

  @Column({ default: 'WORK' })
  step: 'WORK' | 'SHORT' | 'LONG';

  @Column({ nullable: true })
  startDate: Date;

  @Column({ nullable: true })
  startSec: number;

  @Column({ nullable: true })
  lastStartDate: Date;

  @Column({ nullable: true })
  lastStartSec: number;
  
  @Column({ nullable: true })
  pauseSec: number;

  @Column({ default: 0 })
  finishedWorks: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
