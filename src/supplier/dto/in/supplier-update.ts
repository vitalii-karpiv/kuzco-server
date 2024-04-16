import { IsArray, IsMongoId, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class SupplierUpdateDtoIn {
  @IsMongoId()
  id: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsPhoneNumber("UA")
  @IsOptional()
  phone: string;

  @IsArray()
  @IsOptional()
  urls: string[];

  @IsArray()
  @IsOptional()
  keywords: string[];
}
