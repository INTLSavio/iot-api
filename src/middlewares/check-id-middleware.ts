import { Injectable, InternalServerErrorException, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class CheckIdMiddleware implements NestMiddleware {    
    
    constructor(private readonly jwtService: JwtService) {}

    use(req, _, next) {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            throw new UnauthorizedException("Token not found");
        }  

        try {
            const decoded = this.jwtService.verify(token, {secret: process.env.SECRET_AUTH});
            const userId = decoded.sub;

            if (userId !== req.params.id) {
                throw new UnauthorizedException("Only the user can access this resource");
            }

            next();
        } catch (error) {
            throw new InternalServerErrorException()
        }
    }
}