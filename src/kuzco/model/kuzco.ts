import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { KuzcoState } from "../../common/enum/kuzco-state";

@Schema()
export class Kuzco {
  @Prop({ required: true })
  state: KuzcoState;
}

export const KuzcoSchema = SchemaFactory.createForClass(Kuzco);
