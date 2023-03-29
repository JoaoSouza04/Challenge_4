import { Router, Request, Response } from "express";
import { getAllClients, createClient, updateClient, getOneClient } from "./controllers/clientController";
import { getAllCars, createCar, updateCar, deleteCar, getOneCar } from "./controllers/carController";
import { getAllMechanics, createMechanic, updateMechanic, getOneMechanic }
  from "./controllers/mechanicController";
import { getAllParts, createPart, updatePart, getOnePart } from "./controllers/partController";
import { loginClient } from "./controllers/authController";
const routes = Router();

routes.get("/", (req: Request, res: Response) => {
  return res.json({ message: "Welcome to the Auto Repair Shop!" });
})

routes.get("/api/v1/clients", getAllClients);
routes.post("/api/v1/clients", createClient);
routes.patch("/api/v1/clients/:id", updateClient);
routes.get("/api/v1/clients/:id", getOneClient);

routes.get("/api/v1/clients/:id/cars", getAllCars);
routes.post("/api/v1/clients/:id/cars", createCar);
routes.patch("/api/v1/clients/:id/cars/:carId", updateCar);
routes.delete("/api/v1/clients/:id/cars/:carId", deleteCar);
routes.get("/api/v1/clients/:id/cars/:carId", getOneCar);

routes.get("/api/v1/mechanics", getAllMechanics);
routes.post("/api/v1/mechanics", createMechanic);
routes.patch("/api/v1/mechanics/:partId", updateMechanic);
routes.get("/api/v1/mechanics/:partId", getOneMechanic);

routes.get("/api/v1/clients", getAllParts);
routes.post("/api/v1/clients", createPart);
routes.patch("/api/v1/clients/:id", updatePart);
routes.get("/api/v1/clients/:id", getOnePart);

routes.post("/api/v1/client/login", loginClient);

export default routes;