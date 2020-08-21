import { IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';

export class UserDto {
  readonly id: number;

  @ApiProperty({
    description: '用户名称',
    example: '张三',
  })
  @IsNotEmpty({
    message: '用户名不能为空',
    context: { errorCode: ApiErrorCode.NOT_EMPTY },
  })
  @MaxLength(10, {
    message: '名字不能超过10个字符',
    context: { errorCode: ApiErrorCode.STRING_TOO_LONG },
  })
  readonly name: string;

  @ApiProperty({
    required: false,
    description: '性别',
    example: '',
  })
  readonly sex: string;

  @ApiProperty({
    required: false,
    description: '年龄',
    example: '',
  })
  readonly age: number;

  @ApiProperty({
    required: false,
    description: '备注（选填）',
    example: '',
  })
  readonly remark: string;

  readonly createTime: string;
  readonly updateTime: string;
}
