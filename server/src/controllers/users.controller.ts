import { Context, Next } from 'koa'

import Users from '../models/users'
import usersMapper from '../mappers/users.mapper'

export const index = async (context: Context, next: Next) => {
    const users = await Users.query()

    context.status = 200
    context.body = usersMapper.renderMany(users)

    return next()
}

export const show = async (context: Context, next: Next) => {
    const user = await Users.query()
        .findById(context.params.id)

    if (user) {
        context.status = 200
        context.body = usersMapper.render(user)

        return next()
    }

    context.status = 404

    return next()
}

// TODO: Handle user not found
export const update = async (context: Context, next: Next) => {
    const user = await Users.query()
        .patchAndFetchById(context.params.id, context.request.body)

    context.status = 200
    context.body = usersMapper.render(user)

    return next()
}

export const destroy = async (context: Context, next: Next) => {
    const numDeleted = await Users.query()
        .deleteById(context.params.id)

    if (numDeleted) {
        context.status = 204

        return next()
    }

    context.status = 400

    return next()
}

export default { index, show, update, destroy }
