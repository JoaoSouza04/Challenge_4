import Joi from "joi";

export const validateMechanicUpdate = (data: {
  name: string;
  cpf: string;
  birthday: Date
  phone: string;
  email: string;
  specialities: Array<string>;
  hiringDate: Date;
  serviceFee: number;
  status: string;

}) => {

  const createSchema = Joi.object({
    name: Joi.string().required(),
    cpf: Joi.string().min(14).max(14).required(),
    birthday: Joi.required(),
    phone: Joi.string().min(15).max(15).required(),
    email: Joi.string().email().required(),
    specialities: Joi.array().required(),
    hiringDate: Joi.required(),
    serviceFee: Joi.number().required(),
    status: Joi.string().required(),
  })

  return createSchema.validate(data);
}