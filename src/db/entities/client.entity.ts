import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

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
}