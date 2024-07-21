import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatController } from '../controllers/chat-controller';
import { ChatService } from '../services/chat-service';
import { Chat, ChatModel } from '../models/chat-model';
import { User, UserModel } from '../models/user-model';

@Module({
  imports: [MongooseModule.forFeature([{ name: Chat.name, schema: ChatModel }, {name: User.name, schema: UserModel}])],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
