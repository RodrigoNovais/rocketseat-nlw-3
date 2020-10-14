import Joi from 'joi'
import { ValidatorParameter } from '../middlewares/validation.middleware'

export const index = {}

export const show = {
    params: {
        schema: Joi.object().keys({ id: Joi.number().min(1).required() })
    } as ValidatorParameter,
}

export const store = {
    body: {
        schema: Joi.object().keys({
            name: Joi.string().max(255).required(),
            latitude: Joi.number().min(-90).max(90).required(),
            longitude: Joi.number().min(-180).max(180).required(),
            about: Joi.string().max(65535).required(),
            instructions: Joi.string().max(65535).required(),
            opening_hours: Joi.string().max(255).required(),
            open_on_weekends: Joi.boolean().default(false),
            images: Joi.array().items(
                Joi.object().keys({
                    path: Joi.string().required(),
                })
            ),
        }),
        options: { abortEarly: false }
    } as ValidatorParameter,
}

export const update = {
    body: {
        schema: Joi.object().keys({
            name: Joi.string().max(255),
            latitude: Joi.number().min(-90).max(90),
            longitude: Joi.number().min(-180).max(180),
            about: Joi.string().max(65535),
            instructions: Joi.string().max(65535),
            opening_hours: Joi.string().max(255),
            open_on_weekends: Joi.boolean(),
        }),
        options: { abortEarly: false }
    } as ValidatorParameter,

    params: {
        schema: Joi.object().keys({ id: Joi.number().min(1).required() })
    } as ValidatorParameter,
}

export const destroy = {
    params: {
        schema: Joi.object().keys({ id: Joi.number().min(1).required() })
    } as ValidatorParameter,
}

export default { index, show, store, update, destroy }
