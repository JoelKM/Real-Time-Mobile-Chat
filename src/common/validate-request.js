const Joi = require("joi");
const { AppError } = require("./app-error");

const validateRequest = (schema) => (req, res, next) => {
  const {value, error} = Joi.compile(schema)
      .validate(req.body, {abortEarly: false});

  if (error) {
    return next(new AppError(error));
  }

  Object.assign(req, value);
  return next();
};
