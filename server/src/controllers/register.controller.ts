import { Context, Next } from 'koa'
import crypt from 'bcryptjs'

import Users from '../models/users'
import usersView from '../views/users.view'

import { generate } from '../helper/jsonwebtoken'

import { SALT } from '../config'

export const store = async (context: Context, next: Next) => {
    const { name, email, password } = context.request.body

    const exists = await Users.query()
        .where('email', email)
        .first()

    if (exists) {
        context.status = 409
        context.body = 'User already exists'

        return next()
    }

    const user = await Users.query()
        .insertGraph({ name, email, password: crypt.hashSync(password, SALT) })

    const token = await generate({ id: user.id })

    context.status = 201
    context.body = usersView.render(user)
    context.set('Authorization', token)

    return next()
}

export default { store }
