import { IsDateString, IsMongoId, IsNumber, IsOptional, IsString } from "class-validator";

export class InvestmentUpdateDtoIn {
  @IsMongoId()
  id: string;
  @IsString()
  @IsOptional()
  userId: string;
  @IsDateString()
  @IsOptional()
  date: Date;
  @IsNumber()
  @IsOptional()
  amount: number;
}
