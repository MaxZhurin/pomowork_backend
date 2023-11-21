import { User } from '../../users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { DeviceType } from '../../device-types/entities/device-type.entity';
import { Workpoint } from '../../workpoints/entities/workpoint.entity';

export enum UNIT {
  QUANTITY = 'quantity',
  WEIGHT = 'weight',
}

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: UNIT,
    default: UNIT.QUANTITY,
  })
  unit: string;
}
