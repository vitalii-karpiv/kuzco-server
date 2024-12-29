import { Module } from "@nestjs/common";
import { SaleController } from "./sale.controller";
import { SaleService } from "./sale.service";
import { UserModule } from "../user/user.module";
import { MongooseModule } from "@nestjs/mongoose";
import { TagModule } from "../tag/tag.module";
import { Sale, SaleSchema } from "./model/sale";
import { LaptopModule } from "../laptop/laptop.module";

@Module({
  imports: [UserModule, TagModule, LaptopModule, MongooseModule.forFeature([{ name: Sale.name, schema: SaleSchema }])],
  controllers: [SaleController],
  providers: [SaleService],
})
export class SaleModule {}
