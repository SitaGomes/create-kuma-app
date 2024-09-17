import { IsString } from 'class-validator';
import { Dto } from 'src/lib/dto/DtoConstructor';
import { AuthDto } from 'src/public/user/dtos/request/authDto';

export class LoginResDto extends Dto<LoginResDto> {
  @IsString()
  token: string;
  user: AuthDto;
}
