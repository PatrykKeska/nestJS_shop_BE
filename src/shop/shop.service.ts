import { Injectable } from '@nestjs/common';
import { shopItemsEntity } from '../entity/shopItems.entity';
import { ShopItemDto } from '../dto/shop-item.dto';

@Injectable()
export class ShopService {
  async getAllProducts(): Promise<ShopItemDto[]> {
    return await shopItemsEntity.find();
  }

  async addOneProduct(item: ShopItemDto): Promise<ShopItemDto> {
    const { description, price, name, amount } = item;
    const newItem = new shopItemsEntity();
    newItem.name = name;
    newItem.description = description;
    newItem.price = price;
    newItem.amount = amount;
    await newItem.save();
    return newItem;
  }
}
