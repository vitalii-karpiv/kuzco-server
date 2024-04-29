import { IsMongoId, IsNumber, IsOptional, IsString } from "class-validator";

export class ExpenseListDtoIn {
  @IsMongoId()
  @IsOptional()
  orderId: string;
  @IsNumber()
  @IsOptional()
  timeFrom: number;
  @IsNumber()
  @IsOptional()
  timeTo: number;
}
