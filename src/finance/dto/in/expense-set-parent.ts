import { IsMongoId } from "class-validator";

export class ExpenseSetParentDtoIn {
  @IsMongoId()
  id: string;
  @IsMongoId()
  parentId: string;
}
