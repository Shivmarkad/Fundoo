import Joi from '@hapi/joi';

export const newUserValidator = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    email: Joi.string().min(3).required(),
    password : Joi.string().min(6).required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    next();
  }
};

export const loginUserValidator = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().min(3).required(),
    password : Joi.string().min(6).required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    next();
  }
};

export const resetPasswordValidator = (req, res, next) => {
  const schema = Joi.object({
    password : Joi.string().min(6).required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    next();
  }
};