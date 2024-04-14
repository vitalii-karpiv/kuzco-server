import { Module } from "@nestjs/common";
import { SupplierService } from "./supplier.service";
import { SupplierController } from "./supplier.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Supplier, SupplierSchema } from "./model/supplier";

@Module({
  imports: [MongooseModule.forFeature([{ name: Supplier.name, schema: SupplierSchema }])],
  providers: [SupplierService],
  controllers: [SupplierController],
})
export class SupplierModule {}
