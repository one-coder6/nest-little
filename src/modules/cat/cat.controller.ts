import { Controller, Body, Get, Inject } from '@nestjs/common'
import { CatsService } from './cat.services'
import { Cat } from './interface/cat'
import { CommonService } from './../../common/common.service'
import { GlobalService } from './../../config/global/global.service'
@Controller("cats")
export class CatsController {
    constructor(
        private readonly catsService: CatsService, // 业务模块
        private readonly commonService: CommonService, // 共享模块
        private readonly globalService: GlobalService, // 全局模块

    ) { }
    private readonly a = 10;

    @Get()
    async findAll(): Promise<Cat[]> {
        const a = this.commonService.sharFn1();
        const b = this.globalService.goloab1();
        debugger
        return this.catsService.findAll()
    }
    create(@Body() cats) {
        this.catsService.create(cats)
    }

}