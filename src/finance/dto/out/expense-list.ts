import { Expense } from "../../model/expense";
import { PageInfo } from "../../../common/domain/page-info";

export class ExpenseListDtoOut {
  itemList: Expense[];
  pageInfo: PageInfo;
}
