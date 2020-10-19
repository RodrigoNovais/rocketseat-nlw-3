import { Context, Next } from 'koa'
import { verify } from '../helper/jsonwebtoken'
import Users from '../models/users'

export type AuthState = {
    id: NonNullable<Users['id']>
}

export default async (context: Context, next: Next) => {
    const authorization = context.get('Authorization')

    if (!authorization) {
        context.status = 401
        context.body = { error: 'No token provided' }

        return
    }

    const [scheme, token] = authorization.split(' ')

    if (!token) {
        context.status = 401
        context.body = { error: 'No token provided' }

        return
    }

    if (!/^Bearer$/i.test(scheme)) {
        context.status = 401
        context.body = { error: 'Token malformed' }

        return
    }

    try {
        const { id } = await verify(token) as any

        if (!id) {
            context.status = 401
            context.body = { error: 'Token malformed' }

            return
        }

        const user = await Users.query()
            .findById(id)

        if (!user) {
            context.status = 401
            context.body = { error: 'Invalid token' }

            return
        }

        context.state.user = user

        return next()
    } catch {
        context.status = 401
        context.body = { error: 'Invalid token' }

        return
    }
}
