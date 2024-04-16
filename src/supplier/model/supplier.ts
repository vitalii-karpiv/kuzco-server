import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Supplier {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  phone: string;
  @Prop([String])
  urls: string[];
  @Prop([String])
  keywords: string[];
}

export const SupplierSchema = SchemaFactory.createForClass(Supplier);
