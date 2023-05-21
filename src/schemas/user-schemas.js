const Joi = require("joi");

const eventValidationSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: ['com', 'net'] } })
        .min(3)
        .max(50)
        .required(),
    password: Joi.string()
        .min(4)
        .max(70)
        .required(),
})

module.exports = {
    eventValidationSchema
}