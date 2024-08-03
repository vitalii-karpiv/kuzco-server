import { Module } from "@nestjs/common";
import { FinanceController } from "./finance.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Expense, ExpenseSchema } from "./model/expense";
import { ExpenseService } from "./services/expense.service";
import { KuzcoModule } from "../kuzco/kuzco.module";
import { OrderModule } from "../order/order.module";
import { TagModule } from "../tag/tag.module";
import { UserModule } from "../user/user.module";
import { InvestmentService } from "./services/investment.service";
import { Investment, InvestmentSchema } from "./model/investment";
import MonobankService from "./services/monobank-service";
import ExpenseChecker from "./schedulers/expense-checker";

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
  providers: [ExpenseService, InvestmentService, MonobankService, ExpenseChecker],
})
export class FinanceModule {}
