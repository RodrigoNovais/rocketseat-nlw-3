import { Context, Next } from 'koa'

import Users from '../models/users'

export const show = async (context: Context, next: Next) => {
    const { email } = context.request.body

    const user = await Users.query()
        .where('email', email)
        .first()

    return next()
}

export default { show }
