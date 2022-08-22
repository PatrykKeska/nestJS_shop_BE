import {
  Body,
  Controller,
  forwardRef,
  Get,
  Inject,
  Post,
} from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketDto } from '../dto/basket.dto';

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
  async addNewItemToBasket(@Body() item: BasketDto) {
    return this.basketService.addItemToBasket(item);
  }

  @Post('/check')
  async check(@Body() item) {
    const { itemID, userID } = item;
    return await this.basketService.findItemInBasket(userID, itemID);
  }
}
