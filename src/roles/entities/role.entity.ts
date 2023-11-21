import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';

import { Role as RoleEnum } from '../../shared/roles.enum';

const isValidRole = (role: string): boolean => {
  return Object.values(RoleEnum).includes(role as RoleEnum);
};

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: RoleEnum,
    default: RoleEnum.USER,
    transformer: {
      to: (value: RoleEnum) => value,
      from: (value: string) => {
        if (!isValidRole(value)) {
          throw new Error('Invalid role');
        }
        return value;
      },
    },
  })
  name: RoleEnum;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
