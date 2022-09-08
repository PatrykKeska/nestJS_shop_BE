import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopModule } from './shop/shop.module';
import { BasketModule } from './basket/basket.module';
import { UserModule } from './user/user.module';
import { MailModule } from './mail/mail.module';
import { FileTransferModule } from './file-transfer/file-transfer.module';
import { AuthModule } from './auth/auth.module';
import dbConfig from './config/dbConfig';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dbConfig()),
    ShopModule,
    BasketModule,
    UserModule,
    MailModule,
    FileTransferModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
