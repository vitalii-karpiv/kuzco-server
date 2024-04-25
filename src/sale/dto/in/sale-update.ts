import { IsEnum, IsMongoId, IsNumber, IsOptional, IsString } from "class-validator";
import { Delivery } from "../../../common/enum/delivery";

export class SaleUpdateDtoIn {
  @IsMongoId()
  id: string;
  @IsMongoId()
  @IsOptional()
  laptopId: number;
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
