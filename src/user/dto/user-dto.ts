import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class UserInput {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    firstname: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    lastname: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail(null, { message: 'Enter with a valid e-mail' })
    email: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(6, { message: 'Password must have at least 6 characters' })
    password: string;
}

export class UpdateUserInput {
    @ApiProperty()
    @IsString()
    firstname?: string;

    @ApiProperty()
    @IsString()
    lastname?: string;
    
    @ApiProperty()
    @IsString()
    @MinLength(6, { message: 'Password must have at least 6 characters' })
    password?: string;
}