import Koa from 'koa'

import bodyparser from 'koa-bodyparser'
import cors from 'koa2-cors'
import serve from 'koa-static-server'

import routes from './routes'
import errorHandlerMiddleware from './middlewares/error.handler.middleware'

const app = new Koa()

app.use(cors())
app.use(bodyparser())
app.use(errorHandlerMiddleware())

app.use(routes)
app.use(serve({ rootDir: 'uploads', rootPath: '/uploads' }))

export default app
