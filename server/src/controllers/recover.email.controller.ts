import { Context, Next } from 'koa'

import Users from '../models/users'
import usersView from '../views/users.view'

export const show = async (context: Context, next: Next) => {
    return next()
}

export default { show }
