import { IsEnum, IsMongoId } from "class-validator";
import OrderState from "../../../common/enum/order-state";

export class OrderSetStateDtoIn {
  @IsMongoId()
  id: string;
  @IsEnum(OrderState)
  state: OrderState;
}
