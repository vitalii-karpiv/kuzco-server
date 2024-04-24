import { IsEnum, IsMongoId } from "class-validator";
import { LaptopState } from "../../../common/enum/laptop-state";
import { BaseDto } from "../../../common/dto/base-dto";

export class LaptopSetStateDtoIn extends BaseDto {
  @IsMongoId()
  id: string;
  @IsEnum(LaptopState)
  state: LaptopState;
}
