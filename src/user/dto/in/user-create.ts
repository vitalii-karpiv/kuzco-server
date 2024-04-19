import { IsEmail, IsPhoneNumber, IsString } from "class-validator";

export class UserCreateDtoIn {
  constructor(email: string, password: string, name: string, surname: string, phone: string) {
    this.email = email;
    this.password = password;
    this.name = name;
    this.surname = surname;
    this.phone = phone;
  }

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
