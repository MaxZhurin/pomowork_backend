import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { PriceGroup } from '../../price-groups/entities/price-group.entity';

@Entity()
export class Workpoint {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => User)
  users: User[];

  @Column({ nullable: true })
  priceGroupId: number;

  @ManyToOne(() => PriceGroup)
  @JoinColumn({ name: 'priceGroupId' })
  priceGroup: PriceGroup;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;
}
