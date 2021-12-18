import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Photo } from './photo';
import * as bcrypt from 'bcryptjs';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  firstname!: string;
  @Column()
  lastname!: string;
  @Column()
  email!: string;
  @Column()
  password!: string;
  @Column()
  isValid?: boolean;
  @Column()
  @CreateDateColumn()
  createdAt!: Date;
  @Column()
  @UpdateDateColumn()
  updatedAt!: Date;
  @OneToMany(() => Photo, (photo) => photo.user)
  photos?: Photo[];

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
