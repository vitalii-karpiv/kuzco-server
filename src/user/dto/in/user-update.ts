import { IsEmail, IsMongoId, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class UserUpdateDtoIn {
  @IsMongoId()
  id: string;
  @IsEmail()
  @IsOptional()
  email: string;
  @IsString()
  @IsOptional()
  name: string;
  @IsString()
  @IsOptional()
  surname: string;
  @IsPhoneNumber("UA")
  @IsOptional()
  phone: string;

  // TODO: update password ???
}
