import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Inventory} from "./Inventory";


@Entity({name: 'users'})
export class User {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id: number;

  @Column({unique: true})
  username: string;

  @Column()
  password: string;

  @Column()
  createdAt: Date;

  @Column({nullable: true})
  authStrategy: string;

  @OneToMany(() => Inventory, inventory => inventory.user)
  inventoryList: Inventory[]
}
