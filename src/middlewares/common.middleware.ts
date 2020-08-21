import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class CommonMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    next();
  }
}
