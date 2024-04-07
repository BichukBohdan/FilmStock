import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Inventory} from "../typeorm/entities/Inventory";
import {CreateInventoryDto} from "./dto/create-inventory.dto";
import {InventoryDto} from "./dto/inventory.dto";
import {UserDto} from "../users/dto/user.dto";
import {User} from "../typeorm/entities/User";

@Injectable()
export class InventoryService {

  constructor(
      @InjectRepository(Inventory) private inventoryRepository: Repository<Inventory>,
      @InjectRepository(User) private userRepository: Repository<User>
  ) {
  }

  async getAll(user: UserDto) {
    const findUser = await this.userRepository.findOneBy({username: user.username})
    return await this.inventoryRepository.find({where: {user: findUser}})
  }

  async create(dto: CreateInventoryDto, user: UserDto) {
    const findUser = await this.userRepository.findOneBy({username: user.username})
    const inventory = this.inventoryRepository.create({...dto, createdAt: new Date(), user: findUser})
    return this.inventoryRepository.save(inventory)
  }

  async update(id: string, dto: InventoryDto) {
    let existingInventory
    const inventory = await this.inventoryRepository.findOneBy({id: Number(id)})

    if (!inventory) {
      throw new HttpException('Inventory doesnt exist', HttpStatus.BAD_REQUEST)
    }

    if (dto.name) {
      existingInventory = await this.inventoryRepository.findOneBy({name: dto.name})
    }

    if (existingInventory) {
      throw new HttpException('Inventory with such name already exist', HttpStatus.BAD_REQUEST)
    }

    Object.assign(inventory, dto)


    return this.inventoryRepository.save(inventory)
  }

  deleteById(id: string) {
    return this.inventoryRepository.delete(id)
  }
}
