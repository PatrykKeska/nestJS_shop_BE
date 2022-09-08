import { forwardRef, Module } from '@nestjs/common';
import { BasketController } from './basket.controller';
import { BasketService } from './basket.service';
import { ShopModule } from '../shop/shop.module';
import { UserModule } from '../user/user.module';
import { MailModule } from '../mail/mail.module';

@Module({
  controllers: [BasketController],
  providers: [BasketService],
  imports: [
    ShopModule,
    forwardRef(() => UserModule),
    forwardRef(() => MailModule),
  ],
})
export class BasketModule {}
