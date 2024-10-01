import OrderState from "../../../common/enum/order-state";
import { IsDateString, IsEnum, IsNumber, IsOptional, IsString, IsUrl } from "class-validator";
import { BaseDto } from "../../../common/dto/base-dto";

export class OrderCreateDtoIn extends BaseDto {
  @IsString()
  name: string;
  @IsString()
  @IsUrl()
  ebayUrl: string;
  @IsString()
  @IsUrl()
  @IsOptional()
  shippingUrl: string;
  @IsDateString()
  dateOfPurchase: Date;
  @IsNumber()
  itemsInLot: number;
  @IsString()
  @IsEnum(OrderState)
  state: OrderState;
  @IsString()
  @IsOptional()
  note: string;
}
