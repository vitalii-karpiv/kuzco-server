import OrderState from "../../common/enum/order-state";
import { LaptopState } from "../enum/laptop-state";

export class StateHistoryItem {
  state: OrderState | LaptopState;
  timestamp: Date;
  initiator: string;
}
