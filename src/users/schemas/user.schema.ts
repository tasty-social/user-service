import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: null })
  refreshToken: string;

  @Prop({ type: [String], default: ["DEFAULT_USER"] })
  roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);