import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { parse } from 'cookie';
import { AuthService } from "./services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService,
            private authService: AuthService
    ) { }

    async canActivate(
        context: ExecutionContext
    ): Promise<boolean>  {
        const request = context.switchToHttp().getRequest()

        try {
            const cookies = request.headers.cookie; // get the Cookie header
            if (!cookies) {
                return false;
            }

            const cookie = parse(cookies); // parse the cookies
            const token = cookie.token; // extract the token
            if (!token) {
                return false;
            }
            const decoded = await this.jwtService.verifyAsync(token);
            
            if (decoded) {  
                request.user = await this.authService.findUserByUserName(decoded.username)

                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log('Auth error', error)
            return false;
        }
    }
}