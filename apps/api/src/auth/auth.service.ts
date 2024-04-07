import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'
import {User} from "../typeorm/entities/User";


@Injectable()
export class AuthService {
  constructor(
      private userService: UsersService,
      private jwtService: JwtService,
  ) {
  }
  async login(dto: CreateUserDto) {
    const user = await this.validateUser(dto)
    return this.generateToken(user)
  }

  async register(dto: CreateUserDto) {
    const candidate = await this.userService.getUser(dto)

    if (candidate) {
      throw new HttpException('User already exist', HttpStatus.BAD_REQUEST)
    }

    const hashPassword = await bcrypt.hash(dto.password, 5)
    const user = await this.userService.createUser({...dto, password: hashPassword})
    return this.generateToken(user)
  }

  private async generateToken(user: User) {
    const payload = {username: user.username, id: user.id}

    return {
      token: this.jwtService.sign(payload)
    }
  }

  private async validateUser(dto: CreateUserDto) {
    const user = await this.userService.getUser(dto)

    if (!user) {
      throw new HttpException('User with such username doesnt exist', HttpStatus.BAD_REQUEST)
    }

    const passwordsEqual = await bcrypt.compare(dto.password, user.password)

    if (user && passwordsEqual) {
      return user
    }

    throw new UnauthorizedException({message: 'Incorrect email or password'})
  }
}
