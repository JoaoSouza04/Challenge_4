import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from "typeorm"
import bcrypt from "bcryptjs";

@Entity()
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  cpf_cnpj: string

  @Column()
  client_type: string

  @Column()
  birthday: Date

  @Column()
  phone: string

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  zipCode: string

  @Column()
  street: string

  @Column()
  number: string

  @Column()
  neighbourhood: string

  @Column()
  city: string

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }
}