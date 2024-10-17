import { Module } from "@nestjs/common";
import { StockController } from "./stock.controller";
import { StockService } from "./stock.service";
import { UserModule } from "../user/user.module";
import { MongooseModule } from "@nestjs/mongoose";
import { Stock, StockSchema } from "./model/stock";
import { LaptopModule } from "../laptop/laptop.module";

@Module({
  imports: [UserModule, LaptopModule, MongooseModule.forFeature([{ name: Stock.name, schema: StockSchema }])],
  controllers: [StockController],
  providers: [StockService],
})
export class StockModule {}
