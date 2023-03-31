import Joi from "joi";

export const validateCarUpdate = (data: {
  ownerId: string;
  license_plate: string;
  model: string;
  year: number;
  manufacturer: string
  color: string;
}) => {

  const createSchema = Joi.object({
    ownerId: Joi.string().required(),
    license_plate: Joi.string().required(),
    model: Joi.string().required(),
    year: Joi.number().required(),
    manufacturer: Joi.string().required(),
    color: Joi.string().max(30).required(),
  })

  return createSchema.validate(data);
}