import { Injectable, Post } from '@nestjs/common';
import { shopItemsEntity } from '../entity/shopItems.entity';
import { ShopItemDto } from '../dto/shop-item.dto';
import { Like } from 'typeorm';
import { AddProductDto } from '../dto/add-product.dto';
import { MulterDiskUploadedFiles } from '../interfaces/files';
import * as fs from 'fs';
import * as path from 'path';
import { storageDir } from '../utils/storage';
@Injectable()
export class ShopService {
  filter(shopItem: ShopItemDto): ShopItemDto {
    const { id, price, name, description, amount } = shopItem;
    return { id, price, name, description, amount };
  }
  async getAllProducts(): Promise<ShopItemDto[]> {
    return (await shopItemsEntity.find()).map(this.filter);
  }

  async findAvailableProductByName(name): Promise<ShopItemDto[]> {
    return await shopItemsEntity.find({
      where: { name: Like(`%${name}%`) },
    });
  }

  async findAvailableProductById(itemID): Promise<ShopItemDto> {
    return await shopItemsEntity.findOneOrFail({ where: { id: itemID } });
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

  async updateProductAmount(id, amount) {
    const item = await shopItemsEntity.findOneOrFail({ where: { id: id } });
    item.amount = item.amount - amount;
    await item.save();
    return {
      message: `Product amount updated. At the moment in our storage there are ${item.amount} available peaces`,
    };
  }

  async addNewProduct(
    req: AddProductDto,
    files: MulterDiskUploadedFiles,
  ): Promise<AddProductDto> {
    const photo = files?.photo[0] ?? null;
    try {
      const { description, price, amount, name } = req;
      const shopItem = new shopItemsEntity();
      shopItem.name = name;
      shopItem.amount = amount;
      shopItem.price = price;
      shopItem.description = description;
      if (photo) {
        shopItem.photoFn = photo.filename;
      }
      await shopItem.save();
      return this.filter(shopItem);
    } catch (error) {
      try {
        if (photo) {
          fs.unlinkSync(photo.path);
        }
      } catch (error2) {
        throw error2;
      }
      throw error;
    }
  }

  async getPhoto(id: string, res: any) {
    try {
      const one = await shopItemsEntity.findOne({ where: { id } });
      if (!one) {
        throw new Error('No object found');
      }
      if (!one.photoFn) {
        throw new Error('No photo found');
      }
      res.sendFile(one.photoFn, {
        root: path.join(storageDir(), 'product-photos/'),
      });
    } catch (error) {
      res.json({ error });
    }
  }
}
