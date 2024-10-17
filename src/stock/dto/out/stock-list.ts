import { PageInfo } from "../../../common/domain/page-info";
import { Stock } from "../../model/stock";

export class StockListDtoOut {
  itemList: Stock[];
  pageInfo: PageInfo;
}
