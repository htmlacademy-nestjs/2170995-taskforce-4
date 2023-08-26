import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';


@Injectable()
export class UserIdInterceptor implements NestInterceptor {
  public intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    request.body['userId'] = request.user.sub;

    return next.handle();
  }
}
