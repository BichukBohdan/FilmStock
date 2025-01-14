import {Body, Controller, Get, Post} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersService} from "./users.service";

@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) {
  }

  @Get()
  async getUsers() {
    return await this.usersService.getUsers();
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto)
  }
}
