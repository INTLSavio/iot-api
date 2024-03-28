import { Module } from '@nestjs/common';
import { AssociationService } from './association.service';
import { AssociationController } from './association.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Device } from 'src/device/entity/device';
import { User } from 'src/user/entity/user';
import { UserDevice } from 'src/user-device/user-device';

@Module({
  imports: [TypeOrmModule.forFeature([Device, User, UserDevice])],
  providers: [AssociationService],
  controllers: [AssociationController]
})
export class AssociationModule {}
