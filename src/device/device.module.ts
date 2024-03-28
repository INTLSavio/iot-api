import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Device } from './entity/device';
import { User } from 'src/user/entity/user';
import { UserDevice } from 'src/user-device/user-device';

@Module({
  imports: [TypeOrmModule.forFeature([Device, User, UserDevice])],
  providers: [DeviceService],
  controllers: [DeviceController]
})
export class DeviceModule {}
