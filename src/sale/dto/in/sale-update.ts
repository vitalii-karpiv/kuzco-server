import { IsEnum, IsMongoId, IsNumber, IsOptional, IsString } from "class-validator";
import { Delivery } from "../../../common/enum/delivery";
import { BaseDto } from "../../../common/dto/base-dto";

export class SaleUpdateDtoIn extends BaseDto {
  @IsMongoId()
  id: string;
  @IsMongoId()
  @IsOptional()
  laptopId: string;
  @IsNumber()
  @IsOptional()
  price: number;
  @IsString()
  @IsOptional()
  source: string;
  @IsEnum(Delivery)
  @IsOptional()
  deliveryType: string;
  @IsString()
  @IsOptional()
  ttn: string;
}
