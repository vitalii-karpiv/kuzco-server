import OrderState from "../../../common/enum/order-state";
import { IsDateString, IsEnum, IsNumber, IsOptional, IsString, IsUrl } from "class-validator";

export class OrderCreateDtoIn {
  @IsString()
  name: string;
  @IsString()
  @IsUrl()
  ebayUrl: string;
  @IsString()
  @IsUrl()
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
