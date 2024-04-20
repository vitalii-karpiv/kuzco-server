import { IsArray, IsMongoId, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { TechCheck } from "../../model/tech-check";
import { Characteristics } from "../../model/characteristics";
import { Marketplace } from "../../model/marketplace";
import { Type } from "class-transformer";

export class LaptopUpdateDtoIn {
  @IsMongoId()
  id: string;
  @IsNumber()
  @IsOptional()
  limitPrice: number;
  @IsNumber()
  @IsOptional()
  sellPrice: number;
  @IsArray()
  @IsOptional()
  toBuy: string[];
  @IsArray()
  @IsOptional()
  bought: string[];
  @IsArray()
  @IsOptional()
  complectation: string[];
  @IsString()
  @IsOptional()
  note: string;
  @ValidateNested({ each: true, always: true })
  @Type(() => TechCheck)
  @IsOptional()
  techCheck: TechCheck;
  @ValidateNested()
  @Type(() => Characteristics)
  @IsOptional()
  characteristics: Characteristics;
  @ValidateNested()
  @IsOptional()
  marketplaces: Marketplace[];
}
