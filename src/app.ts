import 'reflect-metadata';
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocumentation from "./swagger.json";
import { myDataSource } from "../app-data-source";
import routes from "./routes"
import dotenv from "dotenv";

dotenv.config({ path: './.env' });

myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err)
  })

const app = express();
app.use("/api/v1/documentation", swaggerUi.serve, swaggerUi.setup(swaggerDocumentation));
app.use(express.json());
app.use(routes);

app.listen(3000, () => {
  console.log("Listening on port 3000!");
})