import { Entity, Column, PrimaryGeneratedColumn, AfterInsert } from "typeorm"
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

  @Column({ default: null })
  totalPrice: number

  @Column()
  status: string

  @AfterInsert()
  async changeTotalPrice() {
    const partFound = await myDataSource.getRepository(Part).findBy({ partId: this.parts[0].partId })
    this.parts.forEach(part => {
      let qtd = 0;
      qtd = part.qtd;
      this.totalPrice = qtd * partFound[0].unitPrice;
    })
  }

}