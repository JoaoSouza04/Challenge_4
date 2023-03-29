import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Part {

  @PrimaryGeneratedColumn('uuid')
  partId: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('integer')
  qtd: number;

  @Column('float')
  unitPrice: number;
}