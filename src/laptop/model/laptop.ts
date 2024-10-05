import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { LaptopState } from "../../common/enum/laptop-state";
import { TechCheck } from "./tech-check";
import { Characteristics } from "./characteristics";
import { Marketplace } from "./marketplace";
import { StateHistoryItem } from "../../common/domain/state-history-item";

@Schema()
export class Laptop {
  @Prop({ required: true })
  orderId: string;
  @Prop({ required: true })
  code: string;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  brand: string;
  @Prop({ required: true })
  model: string;
  @Prop({ required: true })
  submodel: string;
  @Prop()
  limitPrice: number;
  @Prop()
  sellPrice: number;
  @Prop()
  state: LaptopState;
  @Prop([String])
  toBuy: string[];
  @Prop([String])
  bought: string[];
  @Prop([String])
  complectation: string[];
  @Prop()
  note: string;
  @Prop({ required: true })
  techCheck: TechCheck;
  @Prop({ required: true })
  characteristics: Characteristics;
  @Prop([Marketplace])
  marketplaces: Marketplace[];
  @Prop([StateHistoryItem])
  stateHistory: StateHistoryItem[];
}

export const LaptopSchema = SchemaFactory.createForClass(Laptop);
