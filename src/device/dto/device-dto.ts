import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from 'class-validator';

export class DeviceInput {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    type: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    local: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    userId: string;
}

export class UpdateDeviceInput {
    @ApiProperty()
    @IsString()
    type?: string;

    @ApiProperty()
    @IsString()
    local?: string;

    @ApiProperty()
    @IsString()
    name?: string;
}