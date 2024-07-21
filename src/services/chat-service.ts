import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat } from '../models/chat-model';
import { User } from '../models/user-model';
import { CreateChatDto } from '../dtos/create-chat.dto';

@Injectable()
export class ChatService {
  constructor(@InjectModel(Chat.name) private chatModel: Model<Chat>,
  @InjectModel(User.name) private userModel: Model<User>) {}

  async createChat(createChatDto: CreateChatDto): Promise<Chat> {
    try {
      const createdChat = new this.chatModel(createChatDto);
      return await createdChat.save();
    } catch (error) {
      throw new Error(`Ошибка при создании чата: ${error.message}`);
    }
  }

  async findAllChatsOfUser(userId: string): Promise<Chat[]> {
    if (!userId) {
      throw new Error('Пользователь не найден, id: ' + userId);
    }

    const user = await this.userModel.findById(userId).exec();

    if (!user) {
      throw new Error('Пользователь не существует, id: ' + userId);
    }

    const chats = await this.chatModel.find({ users: userId }).exec();

    if (!chats || chats.length === 0) {
      throw new Error('Чаты не найдены, id пользователя: ' + userId);
    }

    return chats;
  }
}