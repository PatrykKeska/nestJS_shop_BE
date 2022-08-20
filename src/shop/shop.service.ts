import { Injectable } from '@nestjs/common';
import { shopItemsEntity } from '../entity/shopItems.entity';
import { ShopItemDto } from '../dto/shop-item.dto';
import { Like } from 'typeorm';

@Injectable()
export class ShopService {
  async getAllProducts(): Promise<ShopItemDto[]> {
    return await shopItemsEntity.find();
  }

  async findAvailableProductByName(name): Promise<ShopItemDto[]> {
    return await shopItemsEntity.find({
      where: { name: Like(`%${name}%`) },
    });
  }

  async findAvailableProductById(id): Promise<ShopItemDto> {
    return await shopItemsEntity.findOneOrFail({ where: { id } });
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

  async updateProductAmount(id: string, amount: number) {
    const item = await shopItemsEntity.findOneOrFail({ where: { id: id } });
    item.amount = item.amount - amount;
    await item.save();
    return {
      message: `Product amount updated. At the moment in our storage there are ${item.amount} available peaces`,
    };
  }
}
