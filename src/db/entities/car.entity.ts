import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  license_plate: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  manufacturer: string;

  @Column()
  color: string;
}