import { IsNumber, IsOptional } from "class-validator";

export class ExpenseSyncDtoIn {
  @IsNumber()
  @IsOptional()
  from: number;
  @IsOptional()
  @IsNumber()
  to: number;
}
