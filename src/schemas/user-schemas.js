const Joi = require("joi");

const userValidationSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: ['com', 'net'] } })
        .min(3)
        .max(50)
        .required(),
    name: Joi.string()
        .min(2)
        .max(30)
        .required(),
    password: Joi.string()
        .min(4)
        .max(70)
        .required(),
})

module.exports = {
    userValidationSchema
}