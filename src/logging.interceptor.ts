import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const logger = new Logger()

    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();

    // Access user from the request object
    const user = request.user;
    
    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => logger.verbose(`Request from [${user.username}] user in [${context.getHandler().name}] handler ${Date.now() - now}ms`)),
      );
  }
} 