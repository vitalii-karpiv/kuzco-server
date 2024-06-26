import { Module } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Order, OrderSchema } from "./model/order";
import { UserModule } from "../user/user.module";

@Module({
  imports: [UserModule, MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }])],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}
