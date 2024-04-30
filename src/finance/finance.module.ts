import { Module } from "@nestjs/common";
import { FinanceController } from "./finance.controller";
import { FinanceService } from "./finance.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Expense, ExpenseSchema } from "./model/expense";
import { ExpenseService } from "./expense.service";
import { KuzcoModule } from "../kuzco/kuzco.module";
import { OrderModule } from "../order/order.module";
import { TagModule } from "../tag/tag.module";
import { UserModule } from "../user/user.module";
import { InvestmentService } from "./investment.service";
import { Investment, InvestmentSchema } from "./model/investment";

@Module({
  imports: [
    KuzcoModule,
    OrderModule,
    TagModule,
    UserModule,
    MongooseModule.forFeature([{ name: Expense.name, schema: ExpenseSchema }]),
    MongooseModule.forFeature([{ name: Investment.name, schema: InvestmentSchema }]),
  ],
  controllers: [FinanceController],
  providers: [FinanceService, ExpenseService, InvestmentService],
})
export class FinanceModule {}
