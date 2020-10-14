import Router from '@koa/router'
import multer from '@koa/multer'

import { multerOptions } from '../config'

import orphanagesController from '../controllers/orphanages.controller'

const routes = new Router({ prefix: '/orphanages' })
const upload = multer(multerOptions)

routes.get('/', orphanagesController.index)
routes.get('/:id', orphanagesController.show)

routes.post('/',
    upload.array('images'),
    orphanagesController.store)

routes.put('/:id',orphanagesController.update)
routes.del('/:id', orphanagesController.destroy)

export default routes
