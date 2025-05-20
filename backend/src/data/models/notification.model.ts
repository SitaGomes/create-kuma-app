import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { createUUID } from 'src/utils';
import { NOTIFICATION } from '../constants';

class Notification {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsEnum(NOTIFICATION)
  type: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  action: string;

  @IsNotEmpty()
  @IsBoolean()
  read: boolean = false;

  id: string;
  createdDate: Date;
  updatedDate: Date;

  constructor(
    title: string,
    message: string,
    type: string,
    userId: string,
    action: string,
    read: boolean = false,
    id?: string,
    createdDate?: Date,
    updatedDate?: Date,
  ) {
    this.id = id || createUUID();
    this.title = title;
    this.message = message;
    this.type = type;
    this.userId = userId;
    this.action = action;
    this.read = read;
    this.createdDate = createdDate || new Date();
    this.updatedDate = updatedDate || new Date();
  }
}

export { Notification };
