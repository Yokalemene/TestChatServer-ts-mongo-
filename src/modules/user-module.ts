import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserModel } from '../models/user-model';
import { UserController } from '../controllers/user-controller';
import { UserService } from '../services/user-service';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserModel }])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
