import { ObjectId } from "mongoose";
import { IsMongoId, IsOptional, IsString } from "class-validator";

export class TagListDtoIn {
  @IsMongoId()
  @IsOptional()
  parentId: string;
  @IsString()
  @IsOptional()
  type: string;
}
