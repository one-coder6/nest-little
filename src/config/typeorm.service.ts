import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from './config.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  isDev = process.env.NODE_ENV == 'development';
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const getCfg = key => this.configService.get(key);
    const dbName = getCfg('mongo.db');
    const username = getCfg('mongo.username');
    const password = getCfg('mongo.password');
    const db: TypeOrmModuleOptions = {
      type: 'mongodb',
      host: this.isDev ? 'localhost:27017' : getCfg('mongo.host'),
      username: this.isDev ? '' : username,
      password: this.isDev ? '' : password,
      database: dbName,
      useUnifiedTopology: true, // 当前服务器发现和监视引擎已弃用，将在将来的版本中删除。要使用新的服务器发现和监视引擎，需要配置设置为true
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    };
    /* const all = this.configService.getAll();
    console.log('all', all);*/
    console.log('db config...', db);
    return db;
  }
}
