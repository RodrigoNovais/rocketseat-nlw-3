import compose from 'koa-compose'

import { Context, Next, ParameterizedContext, DefaultState, DefaultContext } from 'koa'
import { RouterParamContext } from '@koa/router'
import { ObjectSchema, ValidationOptions } from 'joi'

import getValidationErrors from '../utils/getValidationErrors'

export type ValidatorParameter = { schema: ObjectSchema, options?: ValidationOptions }
export type Validator = { body?: ValidatorParameter, query?: ValidatorParameter, params?: ValidatorParameter, header?: ValidatorParameter, }

export const body = ({ schema, options }: ValidatorParameter) => {
    return async (context: Context, next: Next) => {
        const { error } = schema.validate(context.request.body, options)

        if (!error) return next()

        context.status = 400
        context.body = {
            message: 'Validation failed',
            errors: getValidationErrors(error),
        }
    }
}

export const header = ({ schema, options }: ValidatorParameter) => {
    return async (context: Context, next: Next) => {
        const { error } = schema.validate(context.request.header, options)

        if (!error) return next()

        context.status = 400
        context.body = {
            message: 'Validation failed',
            errors: getValidationErrors(error),
        }
    }
}

export const query = ({ schema, options }: ValidatorParameter) => {
    return async (context: Context, next: Next) => {
        const { error } = schema.validate(context.request.query, options)

        if (!error) return next()

        context.status = 400
        context.body = {
            message: 'Validation failed',
            errors: getValidationErrors(error),
        }
    }
}

export const params = ({ schema, options }: ValidatorParameter) => {
    return async (context: ParameterizedContext<DefaultState, RouterParamContext<DefaultState, DefaultContext>>, next: Next) => {
        const { error } = schema.validate(context.params, options)

        if (!error) return next()

        context.status = 400
        context.body = {
            message: 'Validation failed',
            errors: getValidationErrors(error),
        }
    }
}

export default (schemas: Validator) => {
    const middleware = []

    if (schemas.body)
        middleware.push(body(schemas.body))

    if (schemas.header)
        middleware.push(header(schemas.header))

    if (schemas.params)
        middleware.push(params(schemas.params))

    if (schemas.query)
        middleware.push(query(schemas.query))

    return compose(middleware)
}
