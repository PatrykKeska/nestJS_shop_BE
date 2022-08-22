import { Body, Controller, forwardRef, Inject, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { createNewUser } from '../dto/user.dto';

@Controller('/user')
export class UserController {
  constructor(
    @Inject(forwardRef(() => UserService)) private userService: UserService,
  ) {}

  @Post('/add')
  async addNewUser(@Body() user: createNewUser) {
    const { email } = user;
    return await this.userService.createNewUser(email);
  }

  @Post('/basket')
  async getUserProducts(@Body() user) {
    const { id } = user;
    return await this.userService.getUserProducts(id);
  }
}
