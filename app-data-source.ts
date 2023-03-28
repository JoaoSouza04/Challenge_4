import { DataSource } from "typeorm"

export const myDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 3000,
  username: "node_user",
  password: "node_user",
  database: "challenge_4",
  entities: ["src/entity/*.js"],
  logging: true,
  synchronize: true,
})