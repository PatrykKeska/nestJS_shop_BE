import { Controller, forwardRef, Get, Inject } from '@nestjs/common';
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
}
