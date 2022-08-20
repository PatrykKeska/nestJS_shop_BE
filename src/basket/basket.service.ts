import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ShopService } from '../shop/shop.service';
import { basketEntity } from '../entity/basket.entity';

@Injectable()
export class BasketService {
  constructor(
    @Inject(forwardRef(() => ShopService)) private shopService: ShopService,
  ) {}

  async getItemsFromDB() {
    return await this.shopService.getAllProducts();
  }

  async findItemInShop(name) {
    return await this.shopService.findAvailableProductByName(name);
  }

  async addItemToBasket(item) {
    const { id, amount } = item;
    const itemInShop = await this.shopService.findAvailableProductById(id);
    if (itemInShop.amount < amount) {
      throw new Error('There is no such amount of this item in our store!');
    }
    if (itemInShop.amount >= 1) {
      const basket = new basketEntity();
      basket.id = id;
      basket.amount = amount;
      await basket.save();
      await this.shopService.updateProductAmount(id, amount);
      return basket;
    }
  }
}
