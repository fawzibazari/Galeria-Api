import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { User } from "./user";

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  url?: string;

  @Column()
  description!: string;

  @Column()
  tags!: string;

  @Column()
  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => User, (user) => user.photos)
  user!: User;
}
