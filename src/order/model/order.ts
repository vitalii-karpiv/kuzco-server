import OrderState from "../../common/enum/order-state";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { StateHistoryItem } from "../../common/domain/state-history-item";

@Schema()
export class Order {
  id: string;
  // TODO: photo ??
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  ebayUrl: string;
  @Prop({ required: true })
  shippingUrl: string;
  @Prop({ required: true })
  dateOfPurchase: Date;
  @Prop({ required: true })
  itemsInLot: number;
  @Prop({ required: true })
  state: OrderState;
  @Prop({ required: false })
  note: string;
  @Prop([StateHistoryItem])
  stateHistory: StateHistoryItem[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
