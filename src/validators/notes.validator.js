import Joi from '@hapi/joi';
import { json } from 'sequelize';

export const notesValidator = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().min(3).required(),
    color: Joi.string().min(3).optional(),
    isTrash: Joi.boolean().optional(),
    isArchieve: Joi.boolean().optional(),
    createdBy: Joi.string().min(3).required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    next();
  }
};
