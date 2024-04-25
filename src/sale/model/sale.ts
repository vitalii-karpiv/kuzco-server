import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { StateHistoryItem } from "../../common/domain/state-history-item";

@Schema()
export class Sale {
  @Prop({ required: true })
  laptopId: string;
  @Prop({ required: true })
  price: number;
  @Prop({ required: true })
  date: Date;
  @Prop({ required: true })
  source: string;
  @Prop({ required: true })
  deliveryType: string;
  @Prop({ required: false })
  ttn: string;
  @Prop({ required: true })
  state: string;
  @Prop([StateHistoryItem])
  stateHistory: StateHistoryItem[];
}

export const SaleSchema = SchemaFactory.createForClass(Sale);
