import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Device } from './entity/device';
import { Repository } from 'typeorm';
import { DeviceInput, UpdateDeviceInput } from './dto/device-dto';
import { User } from 'src/user/entity/user';
import { UserDevice } from 'src/user-device/user-device';

@Injectable()
export class DeviceService {
    constructor(
        @InjectRepository(Device) 
        private readonly devicesRepository: Repository<Device>,
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        @InjectRepository(UserDevice)
        private readonly devicesUsersRepository: Repository<UserDevice>
    ) {}

    async create(deviceInput: DeviceInput): Promise<Device> {
        const user = await this.usersRepository.findOneBy({ id: deviceInput.userId })
        
        if(!user) {
            throw new NotFoundException("User not found");
        }

        const deviceAlreadyExists = await this.devicesRepository.findOneBy({ name: deviceInput.name });

        if(deviceAlreadyExists) {
            throw new ConflictException("Device already exists");
        }

        const device = new Device();

        device.type = deviceInput.type;
        device.local = deviceInput.local;
        device.name = deviceInput.name;

        const response = await this.devicesRepository.save(device);
    
        const usersDevice = new UserDevice();

        usersDevice.device = response;
        usersDevice.user = user;
        usersDevice.accessLevel = "Owner";

        await this.devicesUsersRepository.save(usersDevice);

        return response;
    }

    async getAll(): Promise<Device[]> {
        return this.devicesRepository.find();
    }

    async findOne(id: string): Promise<Device> {
        return this.devicesRepository.findOneBy({ id });
    }

    async update(id: string, deviceInput: UpdateDeviceInput): Promise<Device> {
        const device = await this.findOne(id);
        
        Object.assign(device, deviceInput);
        
        return this.devicesRepository.save(device);
    }

    async delete(id: string): Promise<void> {
        const device = await this.findOne(id);
        await this.devicesRepository.remove(device);
    }
}
