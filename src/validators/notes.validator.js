import Joi from '@hapi/joi';

export const notesValidator = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().min(3).required(),
    color: Joi.string().min(3).optional(),
    isArchieve: Joi.boolean().optional(),
    isTrash: Joi.boolean().optional(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    next();
  }
};
