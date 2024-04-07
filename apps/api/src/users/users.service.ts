import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../typeorm/entities/User";
import {Repository} from "typeorm";
import {CreateUserDto} from "./dto/create-user.dto";

@Injectable()
export class UsersService {

  constructor(
      @InjectRepository(User) private userRepository: Repository<User>,
  ) {
  }

  getUsers() {
    return this.userRepository.find()
  }

  async getUser(dto: CreateUserDto) {
    const user = await this.userRepository.findOneBy({username: dto.username})
    return user
  }

  createUser(dto: CreateUserDto) {
    const newUser = this.userRepository.create({ ...dto, createdAt: new Date() })

    return this.userRepository.save(newUser)
  }
}
