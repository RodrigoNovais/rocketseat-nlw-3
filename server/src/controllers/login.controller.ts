import { Context, Next } from 'koa'
import crypt from 'bcryptjs'

import Users from '../models/users'
import usersMapper from '../mappers/users.mapper'

import { generate } from '../helper/jsonwebtoken'

export const show = async (context: Context, next: Next) => {
    const { email, password } = context.request.body

    const user = await Users.query()
        .where('email', email)
        .first()

    if (user && crypt.compareSync(password, user.password)) {
        const token = await generate({ id: user.id })

        context.body = usersMapper.render(user)
        context.set('Authorization', token)

        return next()
    }

    context.status = 404
    context.body = 'User not found'

    return next()
}

export default { show }
