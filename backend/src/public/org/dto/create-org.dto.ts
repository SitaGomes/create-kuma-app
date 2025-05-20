import { IsIn, IsString } from 'class-validator';
import { ORG_PLAN } from 'src/data';

export class CreateOrgDto {
  @IsString()
  name: string;

  @IsIn(Object.keys(ORG_PLAN))
  plan: string;
}
