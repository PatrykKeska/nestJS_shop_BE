import {
  Body,
  Controller,
  forwardRef,
  Get,
  Inject,
  Post,
} from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopItemDto } from '../dto/shop-item.dto';

@Controller('shop')
export class ShopController {
  constructor(
    @Inject(forwardRef(() => ShopService)) private shopService: ShopService,
  ) {}
  @Get('/')
  async getAllProducts(): Promise<ShopItemDto[]> {
    return await this.shopService.getAllProducts();
  }

  @Post('/add')
  async addNewItem(@Body() item: ShopItemDto): Promise<ShopItemDto> {
    return await this.shopService.addOneProduct(item);
  }
}
