import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "src/user/user.service";
import { JwtPayload } from "../dto/session-dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private userService: UserService) {
    super({
        secretOrKey: process.env.SECRET_AUTH,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
    });
  }

  async validate({ sub }: JwtPayload): Promise<any> {
    const user = await this.userService.findOne(sub);
  
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}