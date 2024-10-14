import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { OrderModule } from "./order/order.module";
import { SupplierModule } from "./supplier/supplier.module";
import { APP_PIPE } from "@nestjs/core";
import { ValidationPipe } from "./common/utils/validation.pipe";
import { MongooseModule } from "@nestjs/mongoose";
import { KuzcoModule } from "./kuzco/kuzco.module";
import * as process from "process";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { StateCheckerMiddleware } from "./middleware/state-checker.middleware";
import { SupplierController } from "./supplier/supplier.controller";
import { OrderController } from "./order/order.controller";
import { TagModule } from "./tag/tag.module";
import { UserModule } from "./user/user.module";
import { TagController } from "./tag/tag.controller";
import { UserController } from "./user/user.controller";
import { AuthModule } from "./auth/auth.module";
import { LaptopModule } from "./laptop/laptop.module";
import { IdentityMiddleware } from "./middleware/identity.middleware";
import { LaptopController } from "./laptop/laptop.controller";
import { SaleModule } from "./sale/sale.module";
import { SaleController } from "./sale/sale.controller";
import { FinanceModule } from "./finance/finance.module";
import { FinanceController } from "./finance/finance.controller";
import { ScheduleModule } from "@nestjs/schedule";
import { StockModule } from "./stock/stock.module";
import { StockController } from "./stock/stock.controller";

@Module({
  imports: [
    OrderModule,
    SupplierModule,
    KuzcoModule,
    TagModule,
    UserModule,
    AuthModule,
    LaptopModule,
    SaleModule,
    FinanceModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("MONGODB_URI"),
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `env/.env.${process.env.NODE_ENV}`,
    }),
    ScheduleModule.forRoot({ cronJobs: true }),
    StockModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(StateCheckerMiddleware)
      .exclude(
        { path: "kuzco", method: RequestMethod.GET },
        { path: "kuzco", method: RequestMethod.POST },
        { path: "kuzco", method: RequestMethod.PUT },
      )
      .forRoutes(
        SupplierController,
        OrderController,
        TagController,
        UserController,
        LaptopController,
        SaleController,
        FinanceController,
        StockController,
      );
    consumer.apply(IdentityMiddleware).forRoutes(OrderController, LaptopController, SaleController);
  }
}
