import Koa from 'koa'
import { Model } from 'objection'

import knex from './database/connection'

import bodyparser from 'koa-bodyparser'
import cors from 'koa2-cors'

import routes from './routes'

Model.knex(knex)

const app = new Koa()

app.use(cors())
app.use(bodyparser())
app.use(routes)

export default app
