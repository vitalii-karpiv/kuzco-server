import { IsEnum, IsOptional } from "class-validator";
import OrderState from "../../../common/enum/order-state";

export class OrderListDtoIn {
  @IsEnum(OrderState)
  @IsOptional()
  state: OrderState;
}
