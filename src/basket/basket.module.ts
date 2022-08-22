import { forwardRef, Module } from '@nestjs/common';
import { BasketController } from './basket.controller';
import { BasketService } from './basket.service';
import { ShopModule } from '../shop/shop.module';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [BasketController],
  providers: [BasketService],
  imports: [ShopModule, forwardRef(() => UserModule)],
})
export class BasketModule {}
