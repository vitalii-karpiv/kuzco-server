import { IsEnum, IsMongoId, IsNumber, IsOptional, IsString } from "class-validator";
import { Delivery } from "../../../common/enum/delivery";
import { BaseDto } from "../../../common/dto/base-dto";
import { SaleSource } from "../../../common/enum/sale-source";

export class SaleCreateDtoIn extends BaseDto {
  @IsMongoId()
  laptopId: string;
  @IsNumber()
  @IsOptional()
  price: number;
  @IsEnum(SaleSource)
  @IsOptional()
  source: SaleSource;
  @IsEnum(Delivery)
  @IsOptional()
  deliveryType: Delivery;
  @IsString()
  @IsOptional()
  ttn: string;
}
