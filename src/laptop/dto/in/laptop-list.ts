import { LaptopState } from "../../../common/enum/laptop-state";
import { IsEnum, IsOptional } from "class-validator";

export class LaptopListDtoIn {
  @IsEnum(LaptopState)
  @IsOptional()
  state: LaptopState;
}
