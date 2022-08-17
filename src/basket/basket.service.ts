import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ShopService } from '../shop/shop.service';

@Injectable()
export class BasketService {
  constructor(
    @Inject(forwardRef(() => ShopService)) private shopService: ShopService,
  ) {}

  async getItemsFromDB() {
    return await this.shopService.getAllProducts();
  }
}
