import { Module } from '@nestjs/common'
import { CatsController } from './cat.controller'
import { CatsService } from './cat.services'
import { CommonModule } from './../../common/common.module'

@Module({
    imports: [CommonModule],
    controllers: [CatsController],
    providers: [CatsService]
})
export class CatsModule {

}