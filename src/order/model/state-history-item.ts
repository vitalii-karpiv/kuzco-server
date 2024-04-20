import OrderState from "../../common/enum/order-state";

export class StateHistoryItem {
  state: OrderState;
  timestamp: Date;
  initiator: string;
}
