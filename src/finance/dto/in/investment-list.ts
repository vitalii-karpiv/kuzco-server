import { IsDateString, IsOptional, IsString } from "class-validator";

export class InvestmentListDtoIn {
  @IsString()
  @IsOptional()
  userId: string;
  @IsDateString()
  @IsOptional()
  dateFrom: Date;
  @IsDateString()
  @IsOptional()
  dateTo: Date;
}
