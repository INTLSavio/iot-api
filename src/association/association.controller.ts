import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { AssociationService } from './association.service';
import { AssociateInput, DesassociateInput } from './dto/associate';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Association')
@Controller('association')
export class AssociationController {
    constructor(private readonly usersDevicesService: AssociationService) {}

    @Post()
    @ApiBearerAuth('JWT-Auth')
    @UseGuards(AuthGuard('jwt'))
    async assignUserToDevice(@Body() { userId, deviceId, accessLevel }: AssociateInput) {
        return this.usersDevicesService.assignUserToDevice(userId, deviceId, accessLevel);
    }

    @Delete()
    @ApiBearerAuth('JWT-Auth')
    @UseGuards(AuthGuard('jwt'))
    async desassignUserToDevice(@Body() { userId, deviceId }: DesassociateInput) {
        return this.usersDevicesService.desassignUserToDevice(userId, deviceId);
    }
}
