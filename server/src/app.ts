import Koa from 'koa'

import bodyparser from 'koa-bodyparser'
import cors from 'koa2-cors'

const app = new Koa()

app.use(cors())
app.use(bodyparser())

export default app
