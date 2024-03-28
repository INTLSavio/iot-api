import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginInput {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    email: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;
}

export class JwtPayload {
    @ApiProperty()
    sub: string;
}