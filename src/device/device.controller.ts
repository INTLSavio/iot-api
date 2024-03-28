import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceInput, UpdateDeviceInput } from './dto/device-dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Device')
@Controller('devices')
export class DeviceController {
    constructor(private readonly deviceService: DeviceService) {}

    @Post()
    @ApiBearerAuth('JWT-Auth')
    @UseGuards(AuthGuard('jwt'))
    async create(@Body() deviceInput: DeviceInput) {
        return this.deviceService.create(deviceInput);
    }

    @Get()
    @ApiBearerAuth('JWT-Auth')
    @UseGuards(AuthGuard('jwt'))
    async getAll() {
        return this.deviceService.getAll();
    }

    @Get(':id')
    @ApiBearerAuth('JWT-Auth')
    @UseGuards(AuthGuard('jwt'))
    async findOne(@Param('id') id: string) {
        return this.deviceService.findOne(id);
    }

    @Put(':id')
    @ApiBearerAuth('JWT-Auth')
    @UseGuards(AuthGuard('jwt'))
    async update(@Param('id') id: string, @Body() deviceInput: UpdateDeviceInput) {
        return this.deviceService.update(id, deviceInput);
    }

    @Delete(':id')
    @ApiBearerAuth('JWT-Auth')
    @UseGuards(AuthGuard('jwt'))
    async delete(@Param('id') id: string) {
        return this.deviceService.delete(id);
    }
}
