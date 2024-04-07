import {Body, Controller, Delete, Get, Param, Post, Req, UseGuards} from '@nestjs/common';
import {InventoryService} from "./inventory.service";
import {CreateInventoryDto} from "./dto/create-inventory.dto";
import {InventoryDto} from "./dto/inventory.dto";
import {JwtAuthGuard} from "../auth/gwt-auth.guard";

@Controller('inventory')
export class InventoryController {

  constructor(private inventoryService: InventoryService) {
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getInventories(@Req() req: any) {
    return await this.inventoryService.getAll(req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createInventory(@Body() dto: CreateInventoryDto, @Req() req: any) {
    return await this.inventoryService.create(dto, req.user)
  }

  @Post('/:id')
  async updateInventory(@Param('id') id: string, @Body() dto: InventoryDto) {
    return await this.inventoryService.update(id, dto)
  }

  @Delete('/:id')
  async deleteInventoryById(@Param('id') id: string) {
    return await this.inventoryService.deleteById(id)
  }
}
