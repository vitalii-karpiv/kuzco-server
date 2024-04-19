import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Schema as MongooseSchema } from "mongoose";

@Schema()
export class RefreshToken {
  // constructor(id: number, userId: string, token: string) {
  //   this.id = id;
  //   this.user = userId;
  //   this.token = token;
  // }

  @Prop({ type: MongooseSchema.Types.ObjectId, required: false })
  userId: string;
  @Prop({ required: true })
  token: string;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
