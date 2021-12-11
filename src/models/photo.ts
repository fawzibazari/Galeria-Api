import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user";

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  url!: string;

  @Column()
  description!: string;

  @ManyToOne(() => User, (user) => user.photos)
  user!: User;
}
