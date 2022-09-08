import { Injectable } from '@nestjs/common';
import { userEntity } from '../entity/user.entity';
import { hashPwd } from '../utils/hash-pwd';

@Injectable()
export class UserService {
  async createNewUser(email: string, pwd: string) {
    const isExist = await this.getOneUserByEmail(email);
    if (!isExist) {
      if (email.includes('@')) {
        const user = new userEntity();
        user.email = email;
        user.pwdHash = hashPwd(pwd);
        await user.save();
        return {
          isSuccess: true,
          message: `user ${user.email} successfully created!, id for new user :${user.id}`,
        };
      } else {
        return {
          isSuccess: false,
          message: `email type : ${email} is incorrect!}`,
        };
      }
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

  async getOneUserByID(id: string) {
    return await userEntity.findOne({
      where: { id },
    });
  }

  async CheckProduct(id: string) {
    return await userEntity.findOne({
      where: { id },
      relations: ['itemsInBasket'],
    });
  }

  async getUserProducts(id: string) {
    return await userEntity.findOne({
      where: { id },
      relations: ['itemsInBasket'],
    });
  }
}
