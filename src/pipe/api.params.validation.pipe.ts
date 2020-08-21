import {
  ArgumentMetadata,
  PipeTransform,
  Injectable,
  HttpStatus,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ApiException } from 'src/filters/api.exception';

@Injectable()
export class ApiParamsValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      // 获取到第一个没有通过验证的错误对象
      const error = errors.shift();
      const constraints = error.constraints;
      const contexts = error.contexts || {};
      // 将未通过验证的字段的错误信息和状态码，以ApiException的形式抛给我们的全局异常过滤器
      if (constraints)
        for (const key in constraints) {
          throw new ApiException(
            constraints[key],
            (contexts[key] && contexts[key].errorCode) || 0,
            HttpStatus.BAD_REQUEST,
          );
        }
      else {
        // 使用对象验证器无法验证对象类型
        throw new ApiException(
          `${error.property} error`,
          0,
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    return Object.assign(value, object);
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find(type => metatype === type);
  }
}
