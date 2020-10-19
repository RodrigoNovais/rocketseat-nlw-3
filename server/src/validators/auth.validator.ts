import Joi from 'joi'
import { ValidatorParameter } from '../middlewares/validation.middleware'

export const login = {
    body: {
        schema: Joi.object().keys({
            email: Joi.string().trim().max(255).email().required(),
            password: Joi.string().trim().max(255).required(),
        }),
        options: { abortEarly: false }
    } as ValidatorParameter,
}

export const register = {
    body: {
        schema: Joi.object().keys({
            name: Joi.string().trim().max(255).required(),
            email: Joi.string().trim().max(255).email().required(),
            password: Joi.string().trim().max(255).required(),
        }),
        options: { abortEarly: false }
    } as ValidatorParameter,
}

export default { login, register }
