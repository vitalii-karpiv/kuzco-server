import { Module } from "@nestjs/common";
import { OrderModule } from "./order/order.module";
import { SupplierModule } from "./supplier/supplier.module";

@Module({
  imports: [OrderModule, SupplierModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
