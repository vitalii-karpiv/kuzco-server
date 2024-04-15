import { IsEnum, IsString } from "class-validator";
import { KuzcoState } from "../../../common/enum/kuzco-state";

export class KuzcoUpdateDtoIn {
  @IsString()
  @IsEnum(KuzcoState)
  state: KuzcoState;
}
