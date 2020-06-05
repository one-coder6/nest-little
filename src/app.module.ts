import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './modules/cat/cat.module'
import { GlobalModule } from './config/global/global.module';

@Module({
  imports: [CatsModule, GlobalModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
