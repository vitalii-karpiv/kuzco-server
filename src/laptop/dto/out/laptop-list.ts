import { Laptop } from "../../model/laptop";
import { PageInfo } from "../../../common/domain/page-info";

export class LaptopListDtoOut {
  itemList: Laptop[];
  pageInfo: PageInfo;
}
