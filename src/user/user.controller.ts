import { Body, Controller, forwardRef, Inject, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { createNewUser } from '../dto/user.dto';

@Controller('/user')
export class UserController {
  constructor(
    @Inject(forwardRef(() => UserService)) private userService: UserService,
  ) {}

  @Post('/register')
  async addNewUser(@Body() user: createNewUser) {
    const { email, pwd } = user;
    console.log(email, pwd);
    return await this.userService.createNewUser(email, pwd);
  }

  @Post('/basket')
  async getUserProducts(@Body() user) {
    const { id } = user;
    return await this.userService.getUserProducts(id);
  }
}
