import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entity/user';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcryptjs';

@Injectable()
export class SessionService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findByEmail(email);
        
        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const isValidCredentials = await compare(password, user.password);

        if (isValidCredentials) {
            return await this.generateToken(user);
        }

        throw new UnauthorizedException('Invalid email or password');
    }       

    async generateToken(user: User) {
        return {
            access_token: this.jwtService.sign(
                { sub: user.id }, 
                {
                secret: process.env.SECRET_AUTH,
                expiresIn: '1h',
            }),
        };
    }
}
