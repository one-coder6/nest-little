import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';
import { Reflector } from '@nestjs/core';

interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
  constructor(private readonly reflector: Reflector) {}
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
    return next.handle().pipe(
      map(data => {
        const noTransfInterceptor = this.reflector.get<boolean>(
          'noTransfInterceptor',
          context.getHandler(),
        );
        if (noTransfInterceptor) return data;
        return {
          success: true,
          resultCode: ApiErrorCode.SUCCESS,
          data,
        };
      }),
    );
  }
}
