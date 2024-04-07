import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ServeStaticModule} from "@nestjs/serve-static";
import {join} from 'path'
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./typeorm/entities/User";
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { InventoryModule } from './inventory/inventory.module';
import {Inventory} from "./typeorm/entities/Inventory";
import * as path from "path";
import * as dotenv from 'dotenv';


const envFilePath = path.resolve(__dirname, '../../../.env');
dotenv.config({path: envFilePath})

@Module({
  imports: [
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [User, Inventory],
        synchronize: true
      }),
      ServeStaticModule.forRoot({
        rootPath: join(__dirname, '../..', 'client', 'dist')
      }),
      UsersModule,
      AuthModule,
      InventoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
