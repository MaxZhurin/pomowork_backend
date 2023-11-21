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
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Role } from '../../roles/entities/role.entity';
import { Workpoint } from '../../workpoints/entities/workpoint.entity';
import { Product } from '../../products/entities/product.entity';
import { DeviceType } from '../../device-types/entities/device-type.entity';
import { Ingredient } from '../../ingredients/entities/ingredient.entity';

@Entity()
export class ProductCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  index: number;

  @Column()
  name: string;

  @Column()
  workpointId: number;

  @Column()
  icon: string;

  @ManyToOne(() => Workpoint)
  @JoinColumn()
  workpoint: Workpoint;

  @Column({ default: true })
  isActive: boolean;
}
