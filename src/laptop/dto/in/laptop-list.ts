import { LaptopState } from "../../../common/enum/laptop-state";
import { IsArray, IsMongoId, IsOptional } from "class-validator";

export class LaptopListDtoIn {
  @IsArray()
  @IsOptional()
  state: LaptopState[];
  @IsMongoId()
  @IsOptional()
  orderId: string;
  @IsArray()
  @IsOptional()
  idList: string[];
}
