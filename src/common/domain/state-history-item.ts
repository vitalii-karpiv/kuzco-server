import OrderState from "../../common/enum/order-state";
import { LaptopState } from "../enum/laptop-state";
import { SaleState } from "../enum/sale-state";
import { StockState } from "../enum/stock-state";

export class StateHistoryItem {
  state: OrderState | LaptopState | SaleState | StockState;
  timestamp: Date;
  initiator: string;
}
