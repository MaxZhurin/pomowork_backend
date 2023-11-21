import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  RelationId,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  VersionColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Role } from '../../roles/entities/role.entity';
import { Workpoint } from '../../workpoints/entities/workpoint.entity';
import { Product } from '../../products/entities/product.entity';
import { DeviceType } from '../../device-types/entities/device-type.entity';
import { Ingredient } from '../../ingredients/entities/ingredient.entity';
import { PriceGroupProduct } from './price-group-pdoducts.entity';

@Entity()
export class PriceGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  index: number;

  @Column()
  name: string;

  @OneToMany(() => Workpoint, (workpoint) => workpoint.priceGroup)
  @JoinColumn()
  workpoints: Workpoint[];

  @OneToMany(
    () => PriceGroupProduct,
    (PriceGroupProduct) => PriceGroupProduct.priceGroup,
  )
  // @JoinColumn()
  priceGroupProducts: PriceGroupProduct[];

  // @RelationId((priceGroup: PriceGroup) => priceGroup.priceGroupProducts)
  // priceGroupProductIds: number[];

  @Column({ default: true })
  isActive: boolean;
}
