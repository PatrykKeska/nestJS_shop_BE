import { Injectable } from '@nestjs/common';
import { userEntity } from '../entity/user.entity';

@Injectable()
export class UserService {
  async createNewUser(email: string) {
    const isExist = await this.getOneUserByEmail(email);
    if (!isExist) {
      const user = new userEntity();
      user.email = email;
      await user.save();
      return {
        isSuccess: true,
        message: `user ${user.email} successfully created!, id for new user :${user.id}`,
      };
    } else {
      return {
        isSuccess: false,
        message: `user ${email} is already in database!}`,
      };
    }
  }

  async getOneUserByEmail(email: string) {
    return await userEntity.findOne({
      where: { email },
    });
  }
}
