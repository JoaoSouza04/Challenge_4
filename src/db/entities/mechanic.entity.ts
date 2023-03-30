import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from "typeorm";
import bcrypt from "bcryptjs";

@Entity()
export class Mechanic {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column()
  birthday: string;

  @Column()
  phone: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column("varchar", { array: true })
  specialities: Array<string>;

  @Column()
  hiringDate: Date

  @Column()
  serviceFee: number

  @Column()
  status: string

  @Column()
  password: string

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }
}