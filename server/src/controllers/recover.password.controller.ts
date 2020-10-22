import { Context, Next } from 'koa'
import { DateTime } from 'luxon'

import Users from '../models/users'

import Mailer from '../service/Mailer'

export const show = async (context: Context, next: Next) => {
    const { email } = context.request.body

    const user = await Users.query()
        .where('email', email)
        .first()

    if (!user) {
        context.status = 404

        return next()
    }

    const expires = DateTime.local().plus({ minutes: 15 })

    const token = await user.$relatedQuery('tokens')
        .insert({
            expires: expires.toISO(),
            type: 'forgot-password',
            token: Math.random()
                .toString(36)
                .slice(2)
                .substring(0, 8)
                .toUpperCase(),
        })

    const resetPasswordURL = `http://192.168.15.16:3000/redefine/password?token=${token.token}`

    Mailer.sendMail({
        from: {
            name: 'Happy',
            address: 'contato@happy.com',
        },
        to: {
            name: user.name,
            address: user.email,
        },
        subject: 'Happy - Recuperação de senha',
        html: `
<h2>Olá, ${user.name}</h2>
<p>Parece que você solicitou uma recuperação de senha, caso queira prosseguir, clique no link abaixo:</p>

<p><a target='_blank' rel='noreferrer noopener' href='${resetPasswordURL}'>Recuperar senha</a></p>
<p>Caso não tenha sido você quem fez a solicitação, favor descartar o e-mail</p>

<p>Equipe Happy</p>
        `,
    })

    context.status = 200

    return next()
}

export default { show }
