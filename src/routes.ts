import { Router, Request, Response } from "express";
import { getAllClients, createClient, updateClient, getOneClient } from "./controllers/clientController";
import { getAllCars, createCar, updateCar, deleteCar, getOneCar } from "./controllers/carController";
import { getAllParts, createPart, updatePart, getOnePart } from "./controllers/partController";
import { getAllMechanics, createMechanic, updateMechanic, getOneMechanic }
  from "./controllers/mechanicController";
import { getAllServices, createService, updateService, getOneService }
  from "./controllers/serviceController";

import { loginClient, loginMechanic, refreshClientToken, refreshMechanicToken, updateClientPassword, updateMechanicPassword } from "./controllers/authController";

import { authClientToken, authGeneralToken, authMechanicToken } from "./middlewares/auth";
import { validCreateClient, validUpdateClient } from "./middlewares/validateClientFields";
import { validCar } from "./middlewares/validateCarFields";
import { validCreateMechanic, validUpdateMechanic } from "./middlewares/validateMechanicFields";
import { validPart } from "./middlewares/validatePartsFields";
import { validService } from "./middlewares/validateServiceFields";

const routes = Router();

routes.get("/api/v1/", (req: Request, res: Response) => {
  return res.json({ message: "Welcome to the Auto Repair Shop!" });
})

routes.get("/api/v1/clients", authGeneralToken, getAllClients);
routes.post("/api/v1/clients", validCreateClient, createClient);
routes.patch("/api/v1/clients/:id", authClientToken, validUpdateClient, updateClient);
routes.get("/api/v1/clients/:id", authClientToken, getOneClient);

routes.get("/api/v1/clients/:id/cars", authGeneralToken, getAllCars);
routes.post("/api/v1/clients/:id/cars", authClientToken, validCar, createCar);
routes.patch("/api/v1/clients/:id/cars/:carId", authClientToken, validCar, updateCar);
routes.delete("/api/v1/clients/:id/cars/:carId", authClientToken, deleteCar);
routes.get("/api/v1/clients/:id/cars/:carId", authGeneralToken, getOneCar);

routes.get("/api/v1/mechanics", authMechanicToken, getAllMechanics);
routes.post("/api/v1/mechanics", validCreateMechanic, createMechanic);
routes.patch("/api/v1/mechanics/:id", authMechanicToken, validUpdateMechanic, updateMechanic);
routes.get("/api/v1/mechanics/:id", authMechanicToken, getOneMechanic);

routes.get("/api/v1/parts", authMechanicToken, getAllParts);
routes.post("/api/v1/parts", authMechanicToken, validPart, createPart);
routes.patch("/api/v1/parts/:partId", authMechanicToken, validPart, updatePart);
routes.get("/api/v1/parts/:partId", authMechanicToken, getOnePart);

routes.get("/api/v1/services", authGeneralToken, getAllServices);
routes.post("/api/v1/services", authMechanicToken, validService, createService);
routes.patch("/api/v1/services/:id", authMechanicToken, validService, updateService);
routes.get("/api/v1/services/:id", authGeneralToken, getOneService);

routes.post("/api/v1/client/login", loginClient);
routes.post("/api/v1/client/updatePassword", authClientToken, updateClientPassword);
routes.post("/api/v1/client/refreshToken", refreshClientToken);

routes.post("/api/v1/mechanic/login", loginMechanic);
routes.post("/api/v1/mechanic/updatePassword", authMechanicToken, updateMechanicPassword);
routes.post("/api/v1/mechanic/refreshToken", refreshMechanicToken);


export default routes;