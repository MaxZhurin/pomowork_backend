import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Settings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column('decimal', { precision: 6, scale: 2, default: 25 })
  workTime: number;

  @Column('decimal', { precision: 6, scale: 2, default: 5 })
  shortTime: number;

  @Column('decimal', { precision: 6, scale: 2, default: 15  })
  longTime: number;

  @Column({default: 'LIGHT'})
  theme: string;

  @Column({default: 'Mexcellent'})
  digitsFont: string;

  @Column({default: false})
  autoStartBreaks: boolean;

  @Column({default: false})
  autoStartWorks: boolean;

  @Column({default: 3})
  longBreakInterval: number;

  @Column({default: '#ffb8b8'})
  workColor: string;

  @Column({default: '#8381df'})
  shortColor: string;

  @Column({default: '#53c188'})
  longColor: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
