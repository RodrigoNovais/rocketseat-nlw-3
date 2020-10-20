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

export const recoverEmail = {
    body: {
        schema: Joi.object().keys({ }),
        options: { abortEarly: false }
    } as ValidatorParameter,
}

export default { recoverEmail, recoverPassword }
