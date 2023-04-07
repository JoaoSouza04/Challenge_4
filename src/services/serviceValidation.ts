import Joi from "joi";
import { Part } from "../db/entities/part.entity";

export const validateServiceData = (data: {
  clientId: string;
  carId: string;
  mechanicId: string
  serviceEstimatedDeliveryDate: Date;
  description: string;
  parts: Array<Part>;
  status: string;
}) => {

  const createSchema = Joi.object({
    clientId: Joi.string().required(),
    carId: Joi.string().required(),
    mechanicId: Joi.string().required(),
    serviceEstimatedDeliveryDate: Joi.required(),
    description: Joi.string().max(100).required(),
    parts: Joi.required(),
    status: Joi.string().required(),
  })

  return createSchema.validate(data);
}