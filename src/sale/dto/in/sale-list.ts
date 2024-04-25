import { IsEnum, IsOptional, IsString } from "class-validator";
import { SaleState } from "../../../common/enum/sale-state";

export class SaleListDtoIn {
  @IsString()
  @IsOptional()
  source: string;
  @IsEnum(SaleState)
  @IsOptional()
  state: string;
}
