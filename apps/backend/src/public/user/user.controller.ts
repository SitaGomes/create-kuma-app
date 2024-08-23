import { AuthUser } from '@kuma/models/src';
import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getUser(@Request() req: { user: AuthUser }) {
    return this.userService.getUser(req.user);
  }
}
