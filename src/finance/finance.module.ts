import { Module } from "@nestjs/common";
import { FinanceController } from "./finance.controller";
import { FinanceService } from "./finance.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Expense, ExpenseSchema } from "./model/expense";
import { ExpenseService } from "./expense.service";
import { KuzcoModule } from "../kuzco/kuzco.module";
import { OrderModule } from "../order/order.module";
import { TagModule } from "../tag/tag.module";

@Module({
  imports: [
    KuzcoModule,
    OrderModule,
    TagModule,
    MongooseModule.forFeature([{ name: Expense.name, schema: ExpenseSchema }]),
  ],
  controllers: [FinanceController],
  providers: [FinanceService, ExpenseService],
})
export class FinanceModule {}
