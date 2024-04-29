import { IsMongoId, IsNumber, IsOptional } from "class-validator";

export class ExpenseUpdateDtoIn {
  @IsMongoId()
  id: string;
  @IsMongoId()
  @IsOptional()
  type: string;
  @IsNumber()
  @IsOptional()
  amount: string;
  @IsNumber()
  @IsOptional()
  time: number;
}
