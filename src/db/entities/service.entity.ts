import { Entity, Column, PrimaryColumn, BeforeInsert, BeforeUpdate, PrimaryGeneratedColumn } from "typeorm"
import { Part } from "./part.entity"

@Entity()
export class Service {

  @PrimaryGeneratedColumn('uuid')
  serviceId: string

  @Column()
  clientId: string

  @Column()
  carId: string

  @Column()
  mechanicId: string

  @Column()
  serviceEstimatedDeliveryDate: Date

  @Column()
  description: string

  @Column("varchar", { array: true })
  parts: Array<Part>

  @Column()
  totalPrice: string

  @Column()
  status: string
}