import { Router, Request, Response } from "express";
import { getAllClients, createClient, updateClient, getOneClient } from "./controllers/clientController";
import { getAllCars, createCar, updateCar, deleteCar, getOneCar } from "./controllers/carController";
import { getAllParts, createPart, updatePart, getOnePart } from "./controllers/partController";
import { getAllMechanics, createMechanic, updateMechanic, getOneMechanic }
  from "./controllers/mechanicController";
import { getAllServices, createService, updateService, getOneService }
  from "./controllers/serviceController";

import { loginClient, loginMechanic, refreshClientToken, refreshMechanicToken, updateClientPassword, updateMechanicPassword } from "./controllers/authController";
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

routes.get("/api/v1/parts", getAllParts);
routes.post("/api/v1/parts", createPart);
routes.patch("/api/v1/parts/:id", updatePart);
routes.get("/api/v1/parts/:id", getOnePart);

routes.get("/api/v1/services", getAllServices);
routes.post("/api/v1/services", createService);
routes.patch("/api/v1/services/:id", updateService);
routes.get("/api/v1/services/:id", getOneService);

routes.post("/api/v1/client/login", loginClient);
routes.post("/api/v1/client/updatePassword", updateClientPassword);
routes.post("/api/v1/client/refreshToken", refreshClientToken);
routes.post("/api/v1/mechanic/login", loginMechanic);
routes.post("/api/v1/mechanic/updatePassword", updateMechanicPassword);
routes.post("/api/v1/mechanic/refreshToken", refreshMechanicToken);


export default routes;