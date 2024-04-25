import { IsEnum, IsMongoId } from "class-validator";
import { SaleState } from "../../../common/enum/sale-state";
import { BaseDto } from "../../../common/dto/base-dto";

export class SaleSetStateDtoIn extends BaseDto {
  @IsMongoId()
  id: string;
  @IsEnum(SaleState)
  state: SaleState;
}
