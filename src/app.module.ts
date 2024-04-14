import { Module } from "@nestjs/common";
import { OrderModule } from "./order/order.module";
import { SupplierModule } from "./supplier/supplier.module";
import { APP_PIPE } from "@nestjs/core";
import { ValidationPipe } from "./common/utils/validation.pipe";

@Module({
  imports: [OrderModule, SupplierModule],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
