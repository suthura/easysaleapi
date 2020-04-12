const Joi = require('joi');

const registerValidation = data => {
    const schema = {
        firstname: Joi.string().min(6).required(),
        lastname: Joi.required(),
        email: Joi.string().min(4).email(),
        phone: Joi.string().min(6),
        password: Joi.string().min(6),
        usertype: Joi.string()
    }

    return Joi.validate(data, schema);
}

module.exports.registerValidation = registerValidation;