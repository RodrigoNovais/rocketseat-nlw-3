import path from 'path'
import fs from 'fs'

import multer from '@koa/multer'
import { VerifyOptions, SignOptions, Algorithm } from 'jsonwebtoken'

import { Options } from 'nodemailer/lib/smtp-transport'

export const multerOptions: multer.Options = {
    storage: multer.diskStorage({
        destination: path.join(__dirname, '..', '..', 'uploads'),
        filename: (request, file, callback) => {
            const fileName = `${Date.now()}-${file.originalname}`

            callback(null, fileName)
        },
    }),
}

export const mailTransporter: Options = {
    host: String(process.env.MAIL_HOST),
    port: Number(process.env.MAIL_PORT),
    auth: {
        user: String(process.env.MAIL_USER),
        pass: String(process.env.MAIL_PASS)
    }
}

export const verifyOptions: VerifyOptions = {
    issuer: String(process.env.TOKEN_ISSUER),
    algorithms: [String(process.env.ALGORITHM) as Algorithm]
}
export const signOptions: SignOptions = {
    issuer: String(process.env.TOKEN_ISSUER),
    expiresIn: String(process.env.TOKEN_EXPIRES_IN),
    algorithm: String(process.env.ALGORITHM) as Algorithm,
}

export const privateKey = fs.readFileSync(path.join(__dirname, '..', 'keys', 'private.key'), 'utf8')
export const publicKey = fs.readFileSync(path.join(__dirname, '..', 'keys', 'public.key'), 'utf8')

export const SALT = Number(process.env.SALT)
export const PORT = Number(process.env.PORT)
