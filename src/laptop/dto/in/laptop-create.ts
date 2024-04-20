import { IsMongoId } from "class-validator";
import { BaseDto } from "../../../common/dto/base-dto";

export class LaptopCreateDtoIn extends BaseDto {
  @IsMongoId()
  orderId: string;
  @IsMongoId()
  brand: string;
  @IsMongoId()
  model: string;
  @IsMongoId()
  submodel: string;
}
