import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    async canActivate(
        context: ExecutionContext
    ): Promise<boolean>  {
        const request = context.switchToHttp().getRequest()

        try {
            const authorization = request.headers.authorization;
            if (!authorization) {
                return false;
            }

            const token = authorization.split(' ')[1];
            const decoded = await this.jwtService.verifyAsync(token);
            if (decoded) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            return false;
        }
    }
}