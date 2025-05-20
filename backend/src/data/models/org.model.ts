import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { createUUID } from 'src/utils';
import { ORG_PLAN } from '../constants';

class Org {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(ORG_PLAN)
  plan: string;

  id: string;
  createdDate: Date;
  updatedDate: Date;

  constructor(
    name: string,
    plan: string,
    id?: string,
    createdDate?: Date,
    updatedDate?: Date,
  ) {
    this.id = id || createUUID();
    this.name = name;
    this.plan = plan;
    this.createdDate = createdDate || new Date();
    this.updatedDate = updatedDate || new Date();
  }
}

export { Org };
