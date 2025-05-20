import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { createUUID } from 'src/utils';

class User {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  orgId: string;

  id: string;
  createdDate: Date;
  updatedDate: Date;

  constructor(
    email: string,
    orgId: string,
    id?: string,
    createdDate?: Date,
    updatedDate?: Date,
  ) {
    this.id = id || createUUID();
    this.email = email;
    this.orgId = orgId;
    this.createdDate = createdDate || new Date();
    this.updatedDate = updatedDate || new Date();
  }
}

export { User };
