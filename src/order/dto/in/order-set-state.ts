import { IsEnum, IsMongoId } from "class-validator";
import OrderState from "../../../common/enum/order-state";
import { BaseDto } from "../../../common/dto/base-dto";

export class OrderSetStateDtoIn extends BaseDto {
  @IsMongoId()
  id: string;
  @IsEnum(OrderState)
  state: OrderState;
}
