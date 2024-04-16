import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectId, Schema as MongooseSchema } from "mongoose";

@Schema()
export class Tag {
  @Prop({ type: MongooseSchema.Types.ObjectId, required: false })
  parentId: ObjectId;
  @Prop({ required: true })
  type: string;
  @Prop({ required: true })
  name: string;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
