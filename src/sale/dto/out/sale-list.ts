import { Sale } from "../../model/sale";
import { PageInfo } from "../../../common/domain/page-info";

export class SaleListDtoOut {
  itemList: Sale[];
  pageInfo: PageInfo;
}
