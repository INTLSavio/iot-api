import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user';
import { SessionService } from 'src/session/session.service';
import { LocalStrategy } from 'src/session/strategy/local';
import { JwtModule } from '@nestjs/jwt';
import { CheckIdMiddleware } from 'src/middlewares/check-id-middleware';

@Module({
  providers: [UserService, SessionService, LocalStrategy],
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({})],
})
export class UserModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckIdMiddleware).forRoutes({ path: "/users/:id", method: RequestMethod.PUT })
  }
}
