import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ShopService } from '../shop/shop.service';
import { basketEntity } from '../entity/basket.entity';
import { BasketDto } from '../dto/basket.dto';
import { UserService } from '../user/user.service';
import { DataSource } from 'typeorm';

@Injectable()
export class BasketService {
  constructor(
    @Inject(DataSource) private dataSource: DataSource,
    @Inject(forwardRef(() => ShopService))
    private shopService: ShopService,
    @Inject(forwardRef(() => UserService)) private userService: UserService,
  ) {}

  async getItemsFromDB() {
    return await this.shopService.getAllProducts();
  }

  async findItemInBasket(userID, itemID) {
    return await this.dataSource
      .getRepository(basketEntity)
      .createQueryBuilder('basket')
      .leftJoinAndSelect('basket.user', 'user')
      .leftJoinAndSelect('basket.items', 'items')
      .where('basket.user.id = :userID', { userID })
      .andWhere('basket.items.id = :itemID', { itemID })
      .getRawOne();
  }

  async findItemInShop(name) {
    return await this.shopService.findAvailableProductByName(name);
  }

  async addItemToBasket(data: BasketDto) {
    const { itemID, amount, userID } = data;
    const isExist = await this.findItemInBasket(userID, itemID);
    const itemInShop = await this.shopService.findAvailableProductById(itemID);
    if (itemInShop) {
      if (itemInShop.amount < amount) {
        throw new Error('There is no such amount of this item in our store!');
      }
      if (itemInShop.amount >= 1) {
        if (!isExist) {
          const basket = new basketEntity();
          basket.amount = amount;
          await basket.save();
          basket.items = itemID;
          basket.user = userID;
          await basket.save();
          await this.shopService.updateProductAmount(itemID, amount);
          return basket;
        } else {
          const updateBasket = await this.dataSource
            .createQueryBuilder()
            .update(basketEntity)
            .set({
              amount: isExist.basket_amount + amount,
            })
            .where('items = :itemID', { itemID })
            .andWhere('user = :userID', { userID })
            .execute();
          await this.shopService.updateProductAmount(itemID, amount);
          return updateBasket;
        }
      }
    }
  }
}
