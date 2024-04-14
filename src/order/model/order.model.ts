import OrderState from "../../common/enum/order-state";

export default class Order {
  _id: string;
  ebayUrl: string;
  meestUrl: string;
  dateOfPurchase: Date;
  itemsInLot: number;
  state: OrderState;

  // Finances
  price: number;
  shippingPrice: number;
}
