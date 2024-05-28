import { IsString } from 'class-validator';

export default class LoginDTO {
  @IsString()
  public email: string;

  @IsString()
  public password: string;
}
