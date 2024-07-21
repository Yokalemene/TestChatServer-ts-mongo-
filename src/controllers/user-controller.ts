import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from '../services/user-service';
import { CreateUserDto } from '../dtos/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('add')
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const user = await this.userService.create(createUserDto);
      return res.status(HttpStatus.CREATED).json(user.id);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Ошибка при создании пользователя',
        error: error.message,
      });
    }
  }
}
