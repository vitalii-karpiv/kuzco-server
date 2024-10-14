import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { StockType } from "../../common/enum/stock-type";
import { StateHistoryItem } from "../../common/domain/state-history-item";
import { StockState } from "../../common/enum/stock-state";

@Schema()
export class Stock {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  code: string; // stock type + count
  @Prop({ required: false })
  laptopId: string;
  @Prop({ required: true })
  price: number;
  @Prop({ required: true })
  type: StockType;
  @Prop({ required: true })
  state: StockState;
  @Prop([StateHistoryItem])
  stateHistory: StateHistoryItem[];
}

export const StockSchema = SchemaFactory.createForClass(Stock);
