import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";

@Entity({name: 'inventory'})
export class Inventory {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id: number;

  @Column({unique: true})
  name: string;

  @Column({default: 0})
  quantity: number;

  @Column({default: 'Inventory description text'})
  description: string;

  @Column()
  createdAt: Date;

  @ManyToOne(() => User, user => user.inventoryList)
  user: User
}
