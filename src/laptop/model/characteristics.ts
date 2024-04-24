import { IsArray, IsString } from "class-validator";

export class Characteristics {
  @IsString()
  processor: string;
  @IsString()
  videocard: string;
  @IsString()
  ssd: string;
  @IsString()
  ram: string;
  @IsArray()
  ports: string[];
  @IsString()
  screen: string;
}
