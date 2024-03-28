import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UpdateUserInput, UserInput } from './dto/user-dto';
import { User } from './entity/user';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('User')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    create(@Body() createUserDto: UserInput): Promise<User> {
        return this.userService.create(createUserDto);
    }

    @Get()
    @ApiBearerAuth('JWT-Auth')
    @UseGuards(AuthGuard('jwt'))
    getUsers(): Promise<User[]> {
        return this.userService.getUsers();
    }

    @Get(':id')
    @ApiBearerAuth('JWT-Auth')
    @UseGuards(AuthGuard('jwt'))
    findOne(@Param('id') id: string): Promise<User> {
        return this.userService.findOne(id);
    }

    @Put(':id')
    @ApiBearerAuth('JWT-Auth')
    update(@Body() updateUserDto: UpdateUserInput, @Param('id') id: string): Promise<User> {
        return this.userService.update(id, updateUserDto);
    }

    @Delete(':id')
    @ApiBearerAuth('JWT-Auth')
    @UseGuards(AuthGuard('jwt'))
    delete(@Param('id') id: string): Promise<void> {
        return this.userService.delete(id);
    }
}
