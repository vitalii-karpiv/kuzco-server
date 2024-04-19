import { ObjectId } from "mongoose";
import { IsMongoId, IsOptional, IsString } from "class-validator";

export class TagCreateDtoIn {
  @IsMongoId()
  @IsOptional()
  parentId: string;
  @IsString()
  type: string;
  @IsString()
  name: string;
}
