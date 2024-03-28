import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DeviceModule } from './device/device.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entity/user';
import { Device } from './device/entity/device';
import { UserDevice } from './user-device/user-device';
import { AssociationModule } from './association/association.module';
import { SessionModule } from './session/session.module';
import { config } from 'dotenv';

config();

@Module({
  imports: 
  [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User, Device, UserDevice],
      logging: false,
      synchronize: true,
    })
    ,UserModule, DeviceModule, AssociationModule, SessionModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
