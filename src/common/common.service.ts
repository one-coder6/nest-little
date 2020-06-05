import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {
    sharFn1() {
        return "共享方法 - sharFn1"
    }
}
