import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Device } from 'src/device/entity/device';
import { UserDevice } from 'src/user-device/user-device';
import { User } from 'src/user/entity/user';
import { Repository } from 'typeorm';

@Injectable()
export class AssociationService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Device)
        private readonly deviceRepository: Repository<Device>,
        @InjectRepository(UserDevice)
        private readonly userDeviceRepository: Repository<UserDevice>,    
    ) {}

    async assignUserToDevice(userId: string, deviceId: string, accessLevel: string): Promise<UserDevice> {
        const user = await this.userRepository.findOneBy({ id: userId });
        const device = await this.deviceRepository.findOneBy({ id: deviceId });

        const sharedDevice = await this.userDeviceRepository.findOneBy({ user: user, device: device, accessLevel: 'Owner' });

        if (sharedDevice !== null && accessLevel === 'Owner') {
            throw new ConflictException('Device only has one owner');
        }

        const userDevice = new UserDevice();

        userDevice.user = user;
        userDevice.device = device;
        userDevice.accessLevel = accessLevel;
        
        return this.userDeviceRepository.save(userDevice);
    }

    async desassignUserToDevice(userId: string, deviceId: string): Promise<void> {
        await this.userDeviceRepository.delete({ user: { id: userId }, device: { id: deviceId }});
    }
}
