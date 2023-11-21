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
import { Ingredient } from '../../ingredients/entities/ingredient.entity';

@Entity()
export class ProductIngredient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  index: number;

  @Column()
  productId: string;

  @ManyToOne(() => Product, (product) => product.productIngredients)
  product: Product;

  @Column()
  ingredientId: number;

  @ManyToOne(() => Ingredient)
  ingredient: Ingredient;

  @Column()
  count: number;
}
