import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/request/loginDto';
import { DatabaseService } from '../lib/database/database.service';
import { AuthUser } from 'src/lib/models';
import { RegisterDto } from './dtos/request/registerDto';
import { LoginResDto } from './dtos/response/loginResDto';

@Injectable()
export class AuthService {
  constructor(
    private db: DatabaseService,
    private jwtService: JwtService,
  ) {}

  async login(data: LoginDto) {
    const user = await this.db.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    if (!(await bcrypt.compare(data.password, user.password))) {
      throw new UnauthorizedException();
    }

    return this.returnAuthUser({
      email: user.email,
      name: user.name,
      id: user.id,
    });
  }

  async register(data: RegisterDto) {
    const user = await this.db.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: await bcrypt.hash(data.password, 10),
      },
    });

    return this.returnAuthUser({
      email: user.email,
      name: user.name,
      id: user.id,
    });
  }

  async validateUser(email: string) {
    const user = await this.db.user.findUnique({
      select: {
        email: true,
        name: true,
        id: true,
      },
      where: {
        email,
      },
    });

    if (user) {
      return user;
    }

    return null;
  }

  async returnAuthUser(authUser: AuthUser) {
    return new LoginResDto({
      token: this.jwtService.sign({ ...authUser }),
      user: authUser,
    });
  }
}
