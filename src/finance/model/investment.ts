import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Investment {
  @Prop({ required: true })
  userId: string;
  @Prop({ required: true })
  amount: number;
  @Prop({ required: true })
  date: Date;
}

export const InvestmentSchema = SchemaFactory.createForClass(Investment);
