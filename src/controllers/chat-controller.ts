import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ChatService } from '../services/chat-service';
import { CreateChatDto } from '../dtos/create-chat.dto';

@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('add')  
  async create(@Body() createChatDto: CreateChatDto, @Res() res: Response) {
    try {
      const chat = await this.chatService.createChat(createChatDto);
      return res.status(HttpStatus.CREATED).json(chat._id);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Ошибка при создании чата',
        error: error.message,
      });
    }
  }

  @Post('get')
  async getChatByUid(@Body('user') user: string, @Res() res: Response) {
    try {
      const chats = await this.chatService.findAllChatsOfUser(user);
      return res.status(HttpStatus.OK).json(chats);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Ошибка при получении чатов',
        error: error.message,
      });
    }
  }
}
