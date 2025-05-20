import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/request/loginDto';
import { RegisterDto } from './dtos/request/registerDto';
import { DatabaseClient, throwErrorFactory } from 'src/lib';
import { ERROR_STATUS, User } from 'src/data';

@Injectable()
export class AuthService {
  constructor(
    private db: DatabaseClient,
    private jwtService: JwtService,
  ) {}

  async login(data: LoginDto) {
    const user = await this.db.user.findUniqueByEmail(data.email);

    if (!user) {
      throwErrorFactory('User not found', ERROR_STATUS.NOT_FOUND);
    }

    if (!(await bcrypt.compare(data.password, '123456'))) {
      throwErrorFactory('Invalid password', ERROR_STATUS.UNAUTHORIZED);
    }

    return this.returnAuthMember(user);
  }

  async register(data: RegisterDto) {
    const userExists = await this.db.user.findUniqueByEmail(data.email);

    if (userExists) {
      throwErrorFactory('User already exists', ERROR_STATUS.CONFLICT);
    }

    const orgExists = await this.db.org.findUnique(data.orgId);

    if (!orgExists) {
      throwErrorFactory('Organization not found', ERROR_STATUS.NOT_FOUND);
    }

    const newUser = new User(data.email, data.orgId);

    await this.db.user.create(newUser);

    return;
  }

  async validateUser(email: string) {
    const user = await this.db.user.findUniqueByEmail(email);
    if (user) {
      return user;
    }

    return null;
  }

  async returnAuthMember(user: User) {
    return {
      token: this.jwtService.sign({ ...user }),
      user: user,
    };
  }
}
