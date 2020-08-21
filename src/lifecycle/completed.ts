import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export default function(app) {
  const env = process.env.NODE_ENV;
  global.isDev = ['development', 'test'].find(item => item === env)
    ? true
    : false;

  // 生成接口文档
  const createSwagger = app => {
    const options = new DocumentBuilder()
      .setTitle('nest-little service nest doc')
      .setDescription('Api description')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api-docs', app, document);
  };
  global.isDev && createSwagger(app);
}
