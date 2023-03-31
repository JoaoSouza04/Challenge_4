import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from "typeorm"
import bcrypt from "bcryptjs";

@Entity()
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'text' })
  name: string

  @Column({ type: 'text' })
  cpf_cnpj: string

  @Column({ type: 'text' })
  client_type: string

  @Column({ type: 'date' })
  birthday: Date

  @Column({ type: 'text' })
  phone: string

  @Column({ type: 'text', unique: true })
  email: string

  @Column({ type: 'text' })
  password: string

  @Column({ type: 'text' })
  zipCode: string

  @Column({ type: 'text' })
  street: string

  @Column({ type: 'text' })
  number: string

  @Column({ type: 'text' })
  neighbourhood: string

  @Column({ type: 'text' })
  city: string

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}