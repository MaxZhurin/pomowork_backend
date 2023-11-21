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
  ManyToOne,
} from 'typeorm';
import { DeviceType } from '../../device-types/entities/device-type.entity';
import { Workpoint } from '../../workpoints/entities/workpoint.entity';

@Entity()
export class Device {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: false })
  connected: boolean;

  @Column({ nullable: true })
  connectedAt: Date;

  @Column({ default: false })
  online: boolean;

  @Column({ nullable: true })
  deviceTypeId: number;

  @ManyToOne(() => DeviceType) //(deviceType) => deviceType.device
  @JoinColumn({ name: 'deviceTypeId' })
  deviceType: DeviceType;

  @Column({ nullable: true })
  workpointId: number;

  @ManyToOne(() => Workpoint)
  @JoinColumn({ name: 'workpointId' })
  workpoint: Workpoint;

  @Column({ nullable: true })
  createdById: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'createdById' })
  createdBy: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;
}
