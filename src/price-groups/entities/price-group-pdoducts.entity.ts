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
import { PriceGroup } from './price-group.entity';

@Entity()
export class PriceGroupProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  index: number;

  @Column()
  productId: string;

  @ManyToOne(() => Product)
  product: Product;

  @Column()
  priceGroupId: string;

  @ManyToOne(() => PriceGroup, (priceGroup) => priceGroup.priceGroupProducts)
  priceGroup: PriceGroup;

  @Column()
  price: number;
}
