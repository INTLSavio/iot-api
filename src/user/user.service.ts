import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user';
import { UpdateUserInput, UserInput } from './dto/user-dto';
import { hash } from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly usersRepository: Repository<User>,
    ) {}

    async create(createUserDto: UserInput): Promise<User> {
        const userAlreadyExists = await this.findByEmail(createUserDto.email);

        if(userAlreadyExists) {
            throw new ConflictException("User already exists");
        }

        const user = new User();

        user.firstname = createUserDto.firstname;
        user.lastname = createUserDto.lastname;
        user.email = createUserDto.email;
        user.password = await hash(createUserDto.password, 8);

        const response = await this.usersRepository.save(user);

        delete response.password;

        return response;
    }

    async getUsers(): Promise<User[]> {
        return this.usersRepository.find({ select: ['id', 'firstname', 'lastname', 'email']});
    }

    async findOne(id: string): Promise<User> {
        return this.usersRepository.findOne({where: {id}, select: ['id', 'firstname', 'lastname', 'email']});
    }

    async findByEmail(email: string): Promise<User> {
        return this.usersRepository.findOneBy({ email });
    }

    async update(id: string, updateUserDto: UpdateUserInput): Promise<User> {
        const user = await this.findOne(id);

        Object.assign(user, updateUserDto);

        if(updateUserDto.password) {
            user.password = await hash(updateUserDto.password, 8);
        }
        
        const response = await this.usersRepository.save(user);

        delete response.password;

        return response;
    }

    async delete(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }
}
