import { IsEnum, IsMongoId, IsNumber, IsOptional, IsString } from "class-validator";
import { BaseDto } from "../../../common/dto/base-dto";
import { StockType } from "../../../common/enum/stock-type";
import { StockState } from "../../../common/enum/stock-state";

export class StockCreateDtoIn extends BaseDto {
  @IsString()
  name: string;
  @IsNumber()
  price: number;
  @IsMongoId()
  @IsOptional()
  laptopId: string;
  @IsEnum(StockType)
  type: string;
  @IsEnum(StockState)
  state: string;
}
