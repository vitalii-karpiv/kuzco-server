import { IsArray, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class SupplierCreateDtoIn {
  @IsString()
  name: string;

  @IsString()
  @IsPhoneNumber("UA")
  phone: string;

  @IsArray()
  @IsOptional()
  urls: string[];

  // TODO: possibly convert to tag in the future
  @IsArray()
  @IsOptional()
  keywords: string[];
}
