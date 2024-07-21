import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageModel } from '../models/message-model';
import { MessageController } from '../controllers/message-controller';
import { MessageService } from '../services/message-service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Message.name, schema: MessageModel,},]),],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
