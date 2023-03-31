import Joi from "joi";

export const validateClientUpdate = (data: {
  name: string;
  cpf_cnpj: string;
  client_type: string;
  birthday: Date
  phone: string;
  email: string;
  zipCode: string;
  street: string;
  number: string;
  neighbourhood: string;
  city: string;

}) => {

  const createSchema = Joi.object({
    name: Joi.string().required(),
    cpf_cnpj: Joi.string().min(14).max(14).required(),
    client_type: Joi.string().min(2).max(2).required(),
    birthday: Joi.required(),
    phone: Joi.string().min(15).max(15).required(),
    email: Joi.string().email().required(),
    zipCode: Joi.string().min(9).max(9).required(),
    street: Joi.string().required(),
    number: Joi.string().required(),
    neighbourhood: Joi.string().required(),
    city: Joi.string().required()
  })

  return createSchema.validate(data);
}