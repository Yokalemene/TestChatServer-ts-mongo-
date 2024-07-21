import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from '../models/message-model';
import { CreateMessageDto } from '../dtos/create-message.dto';

@Injectable()
export class MessageService {
  constructor(@InjectModel(Message.name) private messageModel: Model<Message>) {}

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    try {
      const message = new this.messageModel(createMessageDto);
      return await message.save();
    } catch (error) {
      throw new Error(`Ошибка при отправке сообщения: ${error.message}`);
    }
  }

  async findAllMessagesByChatId(chat: string): Promise<Message[]> {
    const messages = await this.messageModel.find({ chat }).exec();

    if (!messages || messages.length === 0) {
      throw new Error('Сообщения не найдены для чата с id: ' + chat);
    }

    return messages;
  }
}
