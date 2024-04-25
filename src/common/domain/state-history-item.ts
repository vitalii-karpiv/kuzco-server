import OrderState from "../../common/enum/order-state";
import { LaptopState } from "../enum/laptop-state";
import { SaleState } from "../enum/sale-state";

export class StateHistoryItem {
  state: OrderState | LaptopState | SaleState;
  timestamp: Date;
  initiator: string;
}
