import { Model } from 'objection'
import Tokens from './tokens'

export default class Users extends Model {
    id!: number

    name!: string
    email!: string
    password!: string

    tokens?: Tokens[]

    static tableName = 'users'

    static jsonSchema = {
        type: 'object',
        required: ['name', 'email', 'password'],

        properties: {
            id: { type: 'integer' },

            name: { type: 'string', minLength: 1, maxLength: 255 },
            email: { type: 'string', minLength: 1, maxLength: 255 },
            password: { type: 'string', minLength: 1, maxLength: 255 },
        }
    }

    static relationMappings = () => ({
        tokens: {
            relation: Model.HasManyRelation,
            modelClass: Tokens,
            join: {
                from: 'users.id',
                to: 'tokens.user_id',
            }
        }
    })
}
