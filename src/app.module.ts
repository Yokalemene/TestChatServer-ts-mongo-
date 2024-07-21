import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user-module';
import { ChatModule } from './modules/chat-module';
import { MessageModule } from './modules/message-module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/chat-db'),
  UserModule,
  ChatModule,
  MessageModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
