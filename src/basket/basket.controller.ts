import {
  Body,
  Controller,
  forwardRef,
  Get,
  Inject,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketDto } from '../dto/basket.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserObjectDecorator } from '../decorators/user-object.decorator';

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

  @UseGuards(JwtAuthGuard)
  @Post('/add')
  async addNewItemToBasket(
    @Body() item: BasketDto,
    @UserObjectDecorator() user,
  ) {
    console.log(user);
    return this.basketService.addItemToBasket(item, user);
  }

  @Post('/check')
  async check(@Body() item) {
    const { itemID, userID } = item;
    return await this.basketService.findItemInBasket(userID, itemID);
  }
}
