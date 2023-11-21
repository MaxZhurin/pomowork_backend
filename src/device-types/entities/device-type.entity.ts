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
} from 'typeorm';
import { Device } from '../../devices/entities/device.entity';

@Entity()
export class DeviceType {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  name: string;

  @Column()
  limit: number;

  // @OneToOne(() => Device, (device) => device.deviceType)

  // device: Device;
}
