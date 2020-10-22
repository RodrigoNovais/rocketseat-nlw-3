import { Context, Next } from 'koa'
import { DateTime } from 'luxon'

import crypt from 'bcryptjs'

import Tokens from '../models/tokens'

import { SALT } from '../config'

export const show = async (context: Context, next: Next) => {
    const { token, password } = context.request.body

    const userToken = await Tokens.query()
        .withGraphFetched('owner')
        .where('token', token)
        .andWhere('revoked', false)
        .first()

    if (!userToken) {
        context.status = 400

        return next()
    }

    const diff = DateTime.fromISO(userToken.expires).diffNow('minutes')

    if (diff.minutes > 15) {
        context.status = 400

        return next()
    }

    await userToken.$query().patch({ revoked: true })

    await userToken.owner.$query()
        .patch({ password: crypt.hashSync(password, SALT) })

    context.status = 200

    return next()
}

export default { show }
