import { IsEmail, IsPhoneNumber, IsString } from "class-validator";

export class UserCreateDtoIn {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
  @IsString()
  name: string;
  @IsString()
  surname: string;
  @IsPhoneNumber("UA")
  phone: string;
}
