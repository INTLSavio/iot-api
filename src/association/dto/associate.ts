import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class AssociateInput {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    userId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    deviceId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    accessLevel: string;
}

export class DesassociateInput {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    userId: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    deviceId: string;
}