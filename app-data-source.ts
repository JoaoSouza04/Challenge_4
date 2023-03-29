import { DataSource } from "typeorm"
import { Client } from "./src/db/entities/client.entity";
import { Car } from "./src/db/entities/car.entity";

export const myDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "node_user",
  password: "node_user",
  database: "challenge_4",
  entities: [Client, Car],
  logging: true,
  synchronize: true,
})