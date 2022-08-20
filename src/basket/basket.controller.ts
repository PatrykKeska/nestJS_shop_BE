import {
  Body,
  Controller,
  forwardRef,
  Get,
  Inject,
  Post,
} from '@nestjs/common';
import { BasketService } from './basket.service';

@Controller('/basket')
export class BasketController {
  constructor(
    @Inject(forwardRef(() => BasketService))
    private basketService: BasketService,
  ) {}
  @Get('/')
  async showAllItems() {
    return await this.basketService.getItemsFromDB();
  }

  @Post('/find')
  async findItem(@Body() item) {
    const { name } = item;
    return await this.basketService.findItemInShop(name);
  }

  @Post('/add')
  async addNewItemToBasket(@Body() item) {
    return this.basketService.addItemToBasket(item);
  }
}
