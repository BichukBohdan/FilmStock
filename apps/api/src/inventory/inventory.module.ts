import {forwardRef, Module} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Inventory} from "../typeorm/entities/Inventory";
import {User} from "../typeorm/entities/User";
import {AuthModule} from "../auth/auth.module";

@Module({
  providers: [InventoryService],
  controllers: [InventoryController],
  imports: [
      TypeOrmModule.forFeature([Inventory, User]),
      forwardRef(() => AuthModule)
  ]
})
export class InventoryModule {}
