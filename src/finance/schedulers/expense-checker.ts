import { Cron } from "@nestjs/schedule";
import { Injectable } from "@nestjs/common";
import { ExpenseService } from "../services/expense.service";

const ONE_WEEK = 604_800_000;

@Injectable()
export default class ExpenseChecker {
  constructor(private readonly expenseService: ExpenseService) {}
  @Cron("*/1 * * * *")
  handleCron() {
    const now = new Date();
    const from = Number((now.getTime() - ONE_WEEK).toString().slice(0, -3));
    const to = Number(now.getTime().toString().slice(0, -3));
    this.expenseService.syncExpenses({ from, to });
  }
}
