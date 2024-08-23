import { AuthUser } from '@kuma/models/src';
import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/lib/database/database.service';

@Injectable()
export class UserService {
  constructor(private db: DatabaseService) {}

  async getUser(user: AuthUser) {
    return await this.db.user.findUnique({
      select: {
        email: true,
        name: true,
        id: true,
      },
      where: {
        email: user.email,
      },
    });
  }
}
