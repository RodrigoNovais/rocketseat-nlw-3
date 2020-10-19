import Joi from 'joi'
import { ValidatorParameter } from '../middlewares/validation.middleware'

export const index = {}

export const show = {
    params: {
        schema: Joi.object().keys({ id: Joi.number().min(1).required() }),
    } as ValidatorParameter,
}

export const update = {
    body: {
        schema: Joi.object().keys({ name: Joi.string().trim().max(255) }),
        options: { abortEarly: false }
    } as ValidatorParameter,

    params: {
        schema: Joi.object().keys({ id: Joi.number().min(1).required() }),
    } as ValidatorParameter,
}

export const destroy = {
    params: {
        schema: Joi.object().keys({ id: Joi.number().min(1).required() }),
    } as ValidatorParameter,
}

export default { index, show, update, destroy }
