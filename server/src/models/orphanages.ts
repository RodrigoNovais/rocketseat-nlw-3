import { Model } from 'objection'
import Images from './images'

export default class Orphanages extends Model {
    id!: number

    name!: string
    about!: string
    instructions!: string

    opening_hours!: string
    open_on_weekends!: boolean

    latitude!: number
    longitude!: number

    images?: Images[]

    static tableName = 'orphanages'

    static jsonSchema = {
        type: 'object',
        required: ['name', 'about', 'instructions', 'opening_hours', 'longitude', 'latitude'],

        properties: {
            id: { type: 'integer' },

            name: { type: 'string', minLength: 1, maxLength: 255 },
            about: { type: 'string', minLength: 1, maxLength: 65535 },
            instructions: { type: 'string', minLength: 1, maxLength: 65535 },

            opening_hours: { type: 'string', minLength: 1, maxLength: 255 },
            open_on_weekends: { type: 'boolean' },

            longitude: { type: 'number', minimum: -180, maximum: 180 },
            latitude: { type: 'number', minimum: -90, maximum: 90 },
        }
    }

    static relationMappings = () => ({
        images: {
            relation: Model.HasManyRelation,
            modelClass: Images,
            join: {
                from: 'orphanages.id',
                to: 'images.orphanage_id'
            }
        },
    })
}
