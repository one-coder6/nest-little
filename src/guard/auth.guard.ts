import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ApiException } from 'src/filters/api.exception';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['access-token'];
    const noToken = this.reflector.get<boolean>(
      'noToken',
      context.getHandler(),
    );
    if (!noToken && !token) {
      throw new ApiException(
        '缺少访问令牌',
        ApiErrorCode.FAIL,
        HttpStatus.FORBIDDEN,
      );
    }
    global.token = token;
    return true;
  }
}
