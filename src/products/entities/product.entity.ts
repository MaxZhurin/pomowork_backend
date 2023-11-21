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
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Role } from '../../roles/entities/role.entity';
import { Workpoint } from '../../workpoints/entities/workpoint.entity';
import { ProductIngredient } from './product-ingredients.entity';
import { ProductFlow } from './product-flow.entity';
import { ProductCategory } from '../../product-categories/entities/product-category.entity';
import { PriceGroupProduct } from '../../price-groups/entities/price-group-pdoducts.entity';
// import { ProductFlows, ProductIngredients } from '../entities';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  categoryId: string;

  @ManyToOne(() => ProductCategory)
  @JoinColumn()
  category: ProductCategory[];

  @OneToMany(
    () => ProductIngredient,
    (productIngredients) => productIngredients.product,
  )
  productIngredients: ProductIngredient[];

  @OneToMany(() => ProductFlow, (productFlow) => productFlow.product)
  // @JoinTable()
  productFlows: ProductFlow[];

  // @OneToMany(
  //   () => PriceGroupProduct,
  //   (priceGroupProduct) => priceGroupProduct.product,
  // )
  // priceGroupProducts: PriceGroupProduct[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;

  @VersionColumn()
  version!: number;
}
