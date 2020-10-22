import { Model } from 'objection'
import Users from './users'

export default class Tokens extends Model {
    id!: number

    token!: string
    expires!: string

    type!: 'verify-email' | 'forgot-password' | 'forgot-email'

    revoked!: boolean
    owner!: Users

    static tableName = 'tokens'

    static jsonSchema = {
        type: 'object',
        required: ['token', 'type'],

        properties: {
            id: { type: 'integer' },

            token: { type: 'string', minLength: 1, maxLength: 255 },
            expires: { type: 'string', format: 'date-time' },

            type: {
                type: 'string',
                enum: [
                    'verify-email',
                    'forgot-password',
                    'forgot-email',
                ],
            },

            revoked: { type: 'boolean' },
        }
    }

    static relationMappings = () => ({
        owner: {
            relation: Model.BelongsToOneRelation,
            modelClass: Users,

            join: {
                from: 'tokens.user_id',
                to: 'users.id',
            }
        }
    })
}
