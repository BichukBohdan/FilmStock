import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../typeorm/entities/User";
import {Inventory} from "../typeorm/entities/Inventory";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
      TypeOrmModule.forFeature([User, Inventory]),
  ],
  exports: [
      UsersService
  ]
})
export class UsersModule {}
