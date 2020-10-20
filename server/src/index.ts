import { Model } from 'objection'

import knex from './database/connection'
import app from './app'

Model.knex(knex)

import { PORT } from './config'

app.listen(PORT)
