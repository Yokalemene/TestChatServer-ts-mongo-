import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Message extends Document {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'chats', required: true })
  chat: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'users', required: true })
  author: Types.ObjectId;

  @Prop({ required: true })
  text: string;
}

export const MessageModel = SchemaFactory.createForClass(Message);
