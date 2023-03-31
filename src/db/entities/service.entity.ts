import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterUpdate } from "typeorm"
import { myDataSource } from "../../../app-data-source"
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

  @Column({ nullable: true })
  totalPrice: number

  @Column()
  status: string
}