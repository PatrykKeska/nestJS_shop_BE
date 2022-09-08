import {
  Body,
  Controller,
  forwardRef,
  Get,
  Inject,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthLoginDto } from '../dto/auth-login.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(forwardRef(() => AuthService)) private authService: AuthService,
  ) {}
  @Post('/login')
  async phoneRegister(
    @Body() req: AuthLoginDto,
    @Res() res: Response,
  ): Promise<any> {
    return await this.authService.login(req, res);
  }

  @Get('/token')
  @UseGuards(AuthGuard('jwt'))
  async showMeTrue() {
    return { message: 'this is works here' };
  }
}
