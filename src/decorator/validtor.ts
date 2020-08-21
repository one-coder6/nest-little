import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

import moment = require('moment');

// 自定义装饰器
function validateHandler(
  property: string,
  validationOptions?: ValidationOptions,
  customOption?: any,
) {
  return function(object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      name: property,
      ...customOption,
    });
  };
}



// 处理时间格式
export function IsLocalDate(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return validateHandler(property, validationOptions, {
    validator: {
      validate(value: any, args: ValidationArguments) {
        const [relatedPropertyName] = args.constraints;
        // value格式："2020-07-06" -> 2020/07/06 00:00:00
        // 1.不能转成时间格式直接返回false
        // 2.能够转成时间格式则把输入的字符串格式转化为时间格式
        const formats = [
          'YYYY-MM-DD',
          'YYYY-MM-DD LT',
          'YYYY-MM-DD h:mm:ss A',
          'YYYY-MM-DD HH:mm:ss',
          'YYYY-MM-DD HH:mm',
          'YYYY/MM/DD h:mm:ss A',
          'YYYY/MM/DD HH:mm:ss',
          'YYYY/MM/DD HH:mm',
        ];
        const isDate = moment(value, formats, true).isValid();
        if (isDate) {
          (args.object as any)[relatedPropertyName] = new Date(value);
          return true;
        }
        return false;
      },
    },
  });
}
