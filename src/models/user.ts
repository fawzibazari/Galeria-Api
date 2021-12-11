import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Photo } from "./photo";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  firstname!: string;
  @Column()
  lastname!: string;
  @Column()
  password!: string;
  @Column()
  isValid?: boolean;
  @OneToMany(() => Photo, (photo) => photo.user)
  photos?: Photo[];
}
