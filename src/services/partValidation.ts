import Joi from "joi";

export const validatePartData = (data: {
  title: string;
  description: string;
  qtd: number;
  unitPrice: number
}) => {

  const createSchema = Joi.object({
    title: Joi.string().max(30).required(),
    description: Joi.string().max(100).required(),
    qtd: Joi.number().required(),
    unitPrice: Joi.number().required(),
  })

  return createSchema.validate(data);
}