import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

@Injectable()
export class ConfigService {
  public envConfig: { [key: string]: string };
  constructor(config: any) {
    const _path = __dirname + `/../../env/${process.env.NODE_ENV}.env`;
    const local = dotenv.parse(fs.readFileSync(_path));
    this.envConfig = Object.assign(local, config);
  }
  get(key: string): string {
    return this.envConfig[key];
  }
  getAll(): object {
    return this.envConfig;
  }
}
