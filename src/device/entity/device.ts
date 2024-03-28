import { UserDevice } from 'src/user-device/user-device';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('devices')
export class Device {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  type: string;

  @Column({ type: 'text' })
  local: string;

  @Column({ type: 'text', unique: true })
  name: string;

  @OneToMany(() => UserDevice, userDevice => userDevice.device)
  userDevices?: UserDevice[];
}