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
import { Product } from './product.entity';
import { DeviceType } from '../../device-types/entities/device-type.entity';

@Entity()
export class ProductFlow {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  index: number;

  @Column()
  productId: string;

  @ManyToOne(() => Product, (product) => product.productFlows)
  product: Product;

  @Column()
  deviceTypeId: string;

  @ManyToOne(() => DeviceType, (deviceType) => deviceType.id)
  deviceType: DeviceType;
}
