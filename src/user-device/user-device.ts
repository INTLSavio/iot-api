import { Device } from "src/device/entity/device";
import { User } from "src/user/entity/user";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("user_devices")
export class UserDevice {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => User, user => user.userDevices, { cascade: true, onDelete: 'CASCADE'})
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Device, device => device.userDevices, { cascade: true, onDelete: 'CASCADE'})
    @JoinColumn({ name: 'device_id' })
    device: Device;

    @Column()
    accessLevel: string;
}
