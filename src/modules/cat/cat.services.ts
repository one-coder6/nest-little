import { Injectable } from '@nestjs/common'
import { Cat } from './interface/cat'

@Injectable()
export class CatsService {
    private readonly cats: Cat[] = [];

    findAll(): Cat[] {
        return this.cats
    }

    create(cat: Cat) {
        this.cats.push(cat)
    }

}