import { Supplier } from "../../model/supplier";
import { PageInfo } from "../../../common/domain/page-info";

export class SupplierListDtoOut {
  itemList: Supplier[];
  pageInfo: PageInfo;
}
