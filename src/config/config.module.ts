import { Module, Global } from '@nestjs/common';
import { ConfigService } from './config.service';
import apollo = require('ctrip-apollo');

@Global()
@Module({
  providers: [
    {
      provide: ConfigService,
      useFactory: async () => {
        const { envConfig } = new ConfigService({});
        const host = envConfig['apollo.host'];
        let ret = {};
        if (host) {
          const app = apollo({
            host,
            appId: '***',
          });
          const application = app.namespace();
          application.on('change', ({ key, oldValue, newValue }) => {
            //  配置中心配置发生改变之后可以做的事情...
            console.log('change=>', key, oldValue, newValue);
          });
          const appInfo = await application.ready();
          ret = appInfo._config;
        }
        return new ConfigService(ret);
      },
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
