import { IsDateString, IsNumber, IsString } from "class-validator";

export class InvestmentCreateDtoIn {
  @IsString()
  userId: string;
  @IsDateString()
  date: Date;
  @IsNumber()
  amount: number;
}
