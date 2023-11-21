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
import { Product } from '../../products/entities/product.entity';
// import { ProductIngredient } from './product-ingredients.entity';
// import { ProductFlow } from './product-flow.entity';
import { ProductCategory } from '../../product-categories/entities/product-category.entity';
// import { ProductFlows, ProductIngredients } from '../entities';

@Entity()
export class WorkpointProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  workpointId: string;

  @ManyToOne(() => Workpoint)
  @JoinColumn()
  workpoint: Workpoint[];

  @Column({ nullable: true })
  productId: string;

  @ManyToOne(() => Product)
  @JoinColumn()
  product: Product[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;

  @VersionColumn()
  version!: number;
}
