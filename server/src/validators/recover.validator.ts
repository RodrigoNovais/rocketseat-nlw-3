import Joi from 'joi'
import { ValidatorParameter } from '../middlewares/validation.middleware'

export const recoverPassword = {
    body: {
        schema: Joi.object().keys({
            email: Joi.string().trim().max(255).email().required(),
        }),
        options: { abortEarly: false }
    } as ValidatorParameter,
}

export const redefinePassword = {
    body: {
        schema: Joi.object().keys({
            token: Joi.string().trim().required(),
            password: Joi.string().trim().max(255).required(),
        }),
        options: { abortEarly: false }
    } as ValidatorParameter,
}

export default { redefinePassword, recoverPassword }
