import { Module } from "@nestjs/common";
import { OrderModule } from "./order/order.module";
import { SupplierModule } from "./supplier/supplier.module";
import { APP_PIPE } from "@nestjs/core";
import { ValidationPipe } from "./common/utils/validation.pipe";
import { MongooseModule } from "@nestjs/mongoose";
import { KuzcoModule } from "./kuzco/kuzco.module";
import * as process from "process";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    OrderModule,
    SupplierModule,
    KuzcoModule,
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
