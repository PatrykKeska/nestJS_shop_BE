import { Module } from '@nestjs/common';
import { BasketController } from './basket.controller';
import { BasketService } from './basket.service';
import { ShopModule } from '../shop/shop.module';

@Module({
  controllers: [BasketController],
  providers: [BasketService],
  imports: [ShopModule],
})
export class BasketModule {}
