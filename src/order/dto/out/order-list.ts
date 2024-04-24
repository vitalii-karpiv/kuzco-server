import { Order } from "../../model/order";

export class OrderListDtoOut extends Order {
  itemList: Order[];
}
