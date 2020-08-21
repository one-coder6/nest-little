import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpStatus,
} from '@nestjs/common';
import { ApiException } from 'src/filters/api.exception';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';

@Injectable()
export class ParseObjectIDPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    // 5f05398afd7ee76888ef5414
    if (value.length != 24) {
      throw new ApiException(
        'id格式错误',
        ApiErrorCode.IS_NOT_OBJECTID_STRING,
        HttpStatus.BAD_REQUEST,
      );
    }
    return value;
  }
}
