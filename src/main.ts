import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http.exception.filter';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { ApiParamsValidationPipe } from './pipe/api.params.validation.pipe';
import { AuthGuard } from './guard/auth.guard';
import { GlobalMidWare } from './middlewares/global.middleware';
import completed from './lifecycle/completed';
import './global/global-lib-d';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor(new Reflector()));
  app.useGlobalPipes(new ApiParamsValidationPipe());
  app.useGlobalGuards(new AuthGuard(new Reflector()));
  app.use(GlobalMidWare);

  completed(app);
  await app.listen(3000);
}
bootstrap();
