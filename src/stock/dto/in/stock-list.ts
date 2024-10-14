import { IsEnum, IsMongoId, IsOptional } from "class-validator";
import { BaseDto } from "../../../common/dto/base-dto";
import { StockType } from "../../../common/enum/stock-type";

export class StockListDtoIn extends BaseDto {
  @IsMongoId()
  @IsOptional()
  laptopId: string;
  @IsEnum(StockType)
  @IsOptional()
  type: string;
}
