import { Model } from 'objection'

export default class Users extends Model {
    id!: number

    name!: string
    email!: string
    password!: string

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
}
