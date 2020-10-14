import knex from 'knex'
import { development, test } from '../../knexfile'

export default knex(process.env.NODE_ENV === 'test' ? test : development)
