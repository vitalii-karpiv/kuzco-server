import { IsEnum, IsMongoId, IsNumber, IsOptional, IsString } from "class-validator";
import { Delivery } from "../../../common/enum/delivery";
import { BaseDto } from "../../../common/dto/base-dto";

export class SaleCreateDtoIn extends BaseDto {
  @IsMongoId()
  laptopId: string;
  @IsNumber()
  price: number;
  @IsMongoId()
  source: string;
  @IsEnum(Delivery)
  deliveryType: string;
  @IsString()
  @IsOptional()
  ttn: string;
}
