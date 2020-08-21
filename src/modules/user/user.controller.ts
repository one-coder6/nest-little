import { Controller, Get, Post, Body, Param, HttpCode } from '@nestjs/common';
import { ApiTags, ApiHeader } from '@nestjs/swagger';
import { ParseObjectIDPipe } from 'src/pipe/validate.pipe';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@ApiTags('用户中心模块')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 创建一个user
  @Post('createUser')
  @HttpCode(200)
  @ApiHeader({
    name: 'access-token',
    required: true,
    description: '本次请求请带上token',
    example: '546f9a99651c4d13b126f353048766b8',
  })
  async createUser(@Body() userDto: UserDto) {
    return this.userService.createUser(userDto);
  }

  // 根据id查询一个user
  @Get('queryUserById/:id')
  @ApiHeader({
    name: 'access-token',
    required: true,
    description: '本次请求请带上token',
    example: '546f9a99651c4d13b126f353048766b8',
  })
  queryUserById(@Param('id', new ParseObjectIDPipe()) id: string) {
    return this.userService.queryUserById(id);
  }
}
