import { IsEnum, IsMongoId, IsNumber, IsOptional, IsString } from "class-validator";
import { BaseDto } from "../../../common/dto/base-dto";
import { StockType } from "../../../common/enum/stock-type";
import { StockState } from "../../../common/enum/stock-state";

export class StockUpdateDtoIn extends BaseDto {
  @IsMongoId()
  id: string;
  @IsString()
  @IsOptional()
  name: string;
  @IsNumber()
  @IsOptional()
  price: number;
  @IsMongoId()
  @IsOptional()
  laptopId: string;
  @IsEnum(StockType)
  @IsOptional()
  type: string;
  @IsEnum(StockState)
  @IsOptional()
  state: string;
}
