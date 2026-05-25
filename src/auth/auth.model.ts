import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
  _id: true,
})
export class AuthModel {
  @Prop({ unique: true })
  email: string;

  @Prop({ unique: true })
  passwordHash: string;
}

export const AuthSchema = SchemaFactory.createForClass(AuthModel);
