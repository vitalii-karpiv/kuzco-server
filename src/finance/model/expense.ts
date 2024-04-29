import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Expense {
  @Prop({ required: false })
  orderId: string;
  @Prop({ required: true })
  type: string;
  @Prop({ required: true })
  amount: number;
  @Prop({ required: true, unique: true })
  time: number;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
