import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, SchemaTypes } from 'mongoose';

@Schema()
export class Chat extends Document {

  @Prop({required: true})
  name: string;

  @Prop({ type: [SchemaTypes.ObjectId], ref: 'users' })
  users: Types.ObjectId[];

  @Prop({ default: Date.now })
  created_at: Date;

}

export const ChatModel = SchemaFactory.createForClass(Chat);