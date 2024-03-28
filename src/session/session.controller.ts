import { Body, Controller, Post } from '@nestjs/common';
import { SessionService } from './session.service';
import { LoginInput } from './dto/session-dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('session')
export class SessionController {
    constructor(private sessionService: SessionService) {}

    @Post('/login')
    async login(@Body() { email, password }: LoginInput) {
        return this.sessionService.validateUser(email, password);
    }

}
