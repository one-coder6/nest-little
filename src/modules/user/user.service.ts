import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepty: Repository<User>,
  ) {}

  async queryUserById(id: string) {
    const ret = await this.userRepty.findOne(id);
    return ret;
  }

  async createUser(params) {
    const { name, sex, age, remark } = params;
    return await this.userRepty.save({
      name,
      sex,
      age,
      remark,
    });
  }
}
