import { Model } from 'objection'

export default class Images extends Model {
    id!: number

    path!: string

    static tableName = 'images'

    static jsonSchema = {
        type: 'object',
        required: ['path'],

        properties: {
            id: { type: 'integer' },

            path: { type: 'string', minLength: 1, maxLength: 255 },
        }
    }
}
