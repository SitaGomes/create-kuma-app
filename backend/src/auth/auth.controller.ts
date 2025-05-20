import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/request/loginDto';
import { RegisterDto } from './dtos/request/registerDto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() data: LoginDto) {
    return await this.authService.login(data);
  }

  @Post('register')
  @HttpCode(201)
  async register(@Body() data: RegisterDto) {
    return this.authService.register(data);
  }
}
