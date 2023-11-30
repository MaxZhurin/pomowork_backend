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
} from 'typeorm';
import { Role } from '../../roles/entities/role.entity';
import { Workpoint } from '../../workpoints/entities/workpoint.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true })
  @Column()
  login: string;

  @Column({ select: false })
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToMany(() => Role, {
    eager: true,
  })
  @JoinTable()
  roles: Role[];

  @ManyToMany(() => Workpoint)
  @JoinTable()
  workpoints: Workpoint[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @VersionColumn()
  version!: number;
}
