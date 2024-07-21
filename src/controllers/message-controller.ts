import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { MessageService } from '../services/message-service';
import { CreateMessageDto } from '../dtos/create-message.dto';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('add')
  async create(@Body() createMessageDto: CreateMessageDto, @Res() res: Response) {
    try {
      const message = await this.messageService.create(createMessageDto);
      return res.status(HttpStatus.CREATED).json(message);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Ошибка при отправке сообщения',
        error: error.message,
      });
    }
  }

  @Post('get')
  async getAllByChatId(@Body('chat') chat: string, @Res() res: Response) {
    try {
      const messages = await this.messageService.findAllMessagesByChatId(chat);
      return res.status(HttpStatus.OK).json(messages);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Ошибка при получении сообщений',
        error: error.message,
      });
    }
  }
}
