import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { ValidationPipe } from "../common/utils/validation.pipe";
import { ExpenseCreateDtoIn } from "./dto/in/expense-create";
import { ExpenseCreateDtoOut } from "./dto/out/expense-create";
import { ExpenseService } from "./expense.service";
import { ExpenseSetParentDtoOut } from "./dto/out/expense-set-parent";
import { ExpenseSetParentDtoIn } from "./dto/in/expense-set-parent";
import { ExpenseUpdateDtoIn } from "./dto/in/expense-update";
import { ExpenseUpdateDtoOut } from "./dto/out/expense-update";
import { ExpenseListDtoOut } from "./dto/out/expense-list";
import { ExpenseListDtoIn } from "./dto/in/expense-list";

@Controller("finance")
export class FinanceController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post("expense")
  @HttpCode(201)
  expenseCreate(@Body(new ValidationPipe()) kuzcoInitDtoIn: ExpenseCreateDtoIn): Promise<ExpenseCreateDtoOut> {
    return this.expenseService.create(kuzcoInitDtoIn);
  }

  @Post("expense/setParent")
  expenseSetParent(
    @Body(new ValidationPipe()) expenseSetParentDtoIn: ExpenseSetParentDtoIn,
  ): Promise<ExpenseSetParentDtoOut> {
    return this.expenseService.setParent(expenseSetParentDtoIn);
  }

  @Patch("expense")
  expenseUpdate(@Body(new ValidationPipe()) expenseSetParentDtoIn: ExpenseUpdateDtoIn): Promise<ExpenseUpdateDtoOut> {
    return this.expenseService.update(expenseSetParentDtoIn);
  }

  @Get("expense")
  expenseList(@Body(new ValidationPipe()) expenseListDtoIn: ExpenseListDtoIn): Promise<ExpenseListDtoOut> {
    return this.expenseService.list(expenseListDtoIn);
  }

  @Delete("expense/:id")
  expenseDelete(@Param("id") id: string): Promise<void> {
    return this.expenseService.delete(id);
  }
}
