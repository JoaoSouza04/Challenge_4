import 'reflect-metadata';
const express = require("express");
import { myDataSource } from "../app-data-source";

myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err)
  })

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log("Listening on port 3000!");
})