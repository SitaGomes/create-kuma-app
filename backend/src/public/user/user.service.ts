import { AuthUser } from '@kuma/models/src';
import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/lib/database/database.service';

@Injectable()
export class UserService {
  constructor(private db: DatabaseService) {}

  async getUser(user: AuthUser) {
    return user;
  }
}
