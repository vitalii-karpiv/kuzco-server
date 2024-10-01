import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { ValidationPipe } from "../common/utils/validation.pipe";
import { ExpenseCreateDtoIn } from "./dto/in/expense-create";
import { ExpenseCreateDtoOut } from "./dto/out/expense-create";
import { ExpenseService } from "./services/expense.service";
import { ExpenseSetParentDtoOut } from "./dto/out/expense-set-parent";
import { ExpenseSetParentDtoIn } from "./dto/in/expense-set-parent";
import { ExpenseUpdateDtoIn } from "./dto/in/expense-update";
import { ExpenseUpdateDtoOut } from "./dto/out/expense-update";
import { ExpenseListDtoOut } from "./dto/out/expense-list";
import { ExpenseListDtoIn } from "./dto/in/expense-list";
import { InvestmentCreateDtoIn } from "./dto/in/investment-create";
import { InvestmentCreateDtoOut } from "./dto/out/investment-create";
import { InvestmentUpdateDtoIn } from "./dto/in/investment-update";
import { InvestmentUpdateDtoOut } from "./dto/out/investment-update";
import { InvestmentListDtoIn } from "./dto/in/investment-list";
import { InvestmentListDtoOut } from "./dto/out/investment-list";
import { InvestmentService } from "./services/investment.service";
import { ExpenseSyncDtoIn } from "./dto/in/expense-sync";

@Controller("finance")
export class FinanceController {
  constructor(
    private readonly expenseService: ExpenseService,
    private readonly investmentService: InvestmentService,
  ) {}

  @Post("expense")
  @HttpCode(201)
  expenseCreate(@Body(new ValidationPipe()) expenseCreateDtoIn: ExpenseCreateDtoIn): Promise<ExpenseCreateDtoOut> {
    return this.expenseService.create(expenseCreateDtoIn);
  }

  @Post("expense/setParent")
  expenseSetParent(
    @Body(new ValidationPipe()) expenseSetParentDtoIn: ExpenseSetParentDtoIn,
  ): Promise<ExpenseSetParentDtoOut> {
    return this.expenseService.setParent(expenseSetParentDtoIn);
  }

  @Post("expense/sync")
  expenseSync(@Body(new ValidationPipe()) expenseSyncDtoIn: ExpenseSyncDtoIn): Promise<void> {
    return this.expenseService.syncExpenses(expenseSyncDtoIn);
  }

  @Patch("expense")
  expenseUpdate(@Body(new ValidationPipe()) expenseSetParentDtoIn: ExpenseUpdateDtoIn): Promise<ExpenseUpdateDtoOut> {
    return this.expenseService.update(expenseSetParentDtoIn);
  }

  @Post("expense/list")
  @HttpCode(200)
  expenseList(@Body(new ValidationPipe()) expenseListDtoIn: ExpenseListDtoIn): Promise<ExpenseListDtoOut> {
    return this.expenseService.list(expenseListDtoIn);
  }

  @Delete("expense/:id")
  expenseDelete(@Param("id") id: string): Promise<void> {
    return this.expenseService.delete(id);
  }

  @Post("investment")
  @HttpCode(201)
  investmentCreate(@Body(new ValidationPipe()) kuzcoInitDtoIn: InvestmentCreateDtoIn): Promise<InvestmentCreateDtoOut> {
    return this.investmentService.create(kuzcoInitDtoIn);
  }

  @Patch("investment")
  investmentUpdate(
    @Body(new ValidationPipe()) investmentSetParentDtoIn: InvestmentUpdateDtoIn,
  ): Promise<InvestmentUpdateDtoOut> {
    return this.investmentService.update(investmentSetParentDtoIn);
  }

  @Get("investment")
  investmentList(@Body(new ValidationPipe()) investmentListDtoIn: InvestmentListDtoIn): Promise<InvestmentListDtoOut> {
    return this.investmentService.list(investmentListDtoIn);
  }

  @Delete("investment/:id")
  investmentDelete(@Param("id") id: string): Promise<void> {
    return this.investmentService.delete(id);
  }
}
