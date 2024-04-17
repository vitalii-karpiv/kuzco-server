import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  surname: string;
  @Prop({ required: true })
  phone: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
