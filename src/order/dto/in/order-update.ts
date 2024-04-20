import { IsDateString, IsMongoId, IsNumber, IsOptional, IsString, IsUrl } from "class-validator";

export class OrderUpdateDtoIn {
  @IsMongoId()
  id: string;
  @IsString()
  @IsOptional()
  name: string;
  @IsString()
  @IsUrl()
  @IsOptional()
  ebayUrl: string;
  @IsString()
  @IsUrl()
  @IsOptional()
  shippingUrl: string;
  @IsDateString()
  @IsOptional()
  dateOfPurchase: Date;
  @IsNumber()
  @IsOptional()
  itemsInLot: number;
  @IsString()
  @IsOptional()
  note: string;
}
