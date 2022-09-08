import {
  Body,
  Controller,
  forwardRef,
  Get,
  ImATeapotException,
  Inject,
  Post,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopItemDto } from '../dto/shop-item.dto';
import { PasswordProtectGuard } from '../guards/passwordProtect.guard';
import { UsePassword } from '../decorators/use-password.decorator';
import { MyTimeoutInterceptor } from '../interceptors/my-Timeout.interceptors';
import { MyCacheInterceptor } from '../interceptors/my-cache.interceptor';
import { AddProductDto } from '../dto/add-product.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { multerStorage, storageDir } from '../utils/storage';
import { MulterDiskUploadedFiles } from '../interfaces/files';

@Controller('shop')
export class ShopController {
  constructor(
    @Inject(forwardRef(() => ShopService)) private shopService: ShopService,
  ) {}
  @Get('/')
  async getAllProducts(): Promise<ShopItemDto[]> {
    return await this.shopService.getAllProducts();
  }

  @Post('/')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'photo', maxCount: 1 }], {
      storage: multerStorage(path.join(storageDir(), 'product-photos')),
    }),
  )
  addNewProduct(
    @Body() req: AddProductDto,
    @UploadedFiles() files: MulterDiskUploadedFiles,
  ): Promise<AddProductDto> {
    return this.shopService.addNewProduct(req, files);
  }

  @Post('/add')
  async addNewItem(@Body() item: ShopItemDto): Promise<ShopItemDto> {
    return await this.shopService.addOneProduct(item);
  }

  @Get('/globalerror')
  async testGlobalErrors() {
    throw new ImATeapotException();
  }

  @Get('/admin')
  @UseGuards(PasswordProtectGuard)
  @UsePassword('admin')
  getAdminData() {
    return true;
  }

  @Post('/photo')
  async getPhoto(@Body() body, @Res() res: any): Promise<any> {
    const { id } = body;
    return this.shopService.getPhoto(id, res);
  }

  @Get('/stats')
  @UseGuards(PasswordProtectGuard)
  @UsePassword('stats')
  @UseInterceptors(MyTimeoutInterceptor, MyCacheInterceptor)
  getStats() {
    return this.shopService.getAllProducts();
  }
}
