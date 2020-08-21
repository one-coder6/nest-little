import { SetMetadata } from '@nestjs/common';

/**
 * 去掉拦截器转换输出原始值
 */
export const NoTransfInterceptor = () =>
  SetMetadata('noTransfInterceptor', true);

/**
 * 免token访问
 */
export const NoToken = () => SetMetadata('noToken', true);
