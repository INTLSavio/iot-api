import { Device } from 'src/device/entity/device';
import { UserDevice } from 'src/user-device/user-device';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  firstname: string;

  @Column({ type: 'text' })
  lastname: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @OneToMany(() => UserDevice, userDevice => userDevice.user)
  userDevices?: UserDevice[];
}