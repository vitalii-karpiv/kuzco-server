import { Order } from "../../model/order.model";

export class OrderListDtoOut extends Order {
  itemList: Order[];
}
