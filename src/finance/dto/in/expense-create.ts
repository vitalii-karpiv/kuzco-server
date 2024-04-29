import { IsMongoId, IsNumber, IsOptional, IsString } from "class-validator";

export class ExpenseCreateDtoIn {
  @IsMongoId()
  @IsOptional()
  orderId: string;
  @IsString()
  @IsMongoId()
  type: string;
  @IsNumber()
  amount: number;
  @IsNumber()
  time: number;
}
