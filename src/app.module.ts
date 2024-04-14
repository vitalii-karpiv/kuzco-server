import { Module } from "@nestjs/common";
import { OrderModule } from "./order/order.module";
import { SupplierModule } from "./supplier/supplier.module";
import { APP_PIPE } from "@nestjs/core";
import { ValidationPipe } from "./common/utils/validation.pipe";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  //
  imports: [
    OrderModule,
    SupplierModule,
    MongooseModule.forRoot(`mongodb+srv://vitaliakarpiv:RSkauTqBtGMWvrf6@local.zhtudpk.mongodb.net/local_dev`),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
