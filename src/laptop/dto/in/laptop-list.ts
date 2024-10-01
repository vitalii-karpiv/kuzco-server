import { LaptopState } from "../../../common/enum/laptop-state";
import { IsEnum, IsMongoId, IsOptional } from "class-validator";

export class LaptopListDtoIn {
  @IsEnum(LaptopState)
  @IsOptional()
  state: LaptopState;
  @IsMongoId()
  @IsOptional()
  orderId: string;
}
