import jwt, { VerifyErrors } from 'jsonwebtoken'

import { publicKey, privateKey, verifyOptions, signOptions } from '../config'
import Users from '../models/users'

export type IToken = {
    id: NonNullable<Users['id']>
}

export const verify = (token: string): Promise<object> => {
    return new Promise((resolve, reject) => {
        const verifyAction = (error: VerifyErrors | null, payload?: object) => {
            if (error) return reject(error)

            resolve(payload)
        }

        jwt.verify(token, publicKey, verifyOptions, verifyAction)
    })
}

export const generate = (payload: IToken): Promise<string> => {
    return new Promise((resolve, reject) => {
        const signAction = (error: Error | null, hash?: string) => {
            if (error) return reject(error)

            resolve(hash)
        }

        jwt.sign(payload, privateKey, signOptions, signAction)
    })
}
