import Router from '@koa/router'
import multer from '@koa/multer'

import { multerOptions } from '../config'

import orphanagesController from '../controllers/orphanages.controller'
import orphanageValidator from '../validators/orphanage.validator'
import validationMiddleware from '../middlewares/validation.middleware'

const routes = new Router({ prefix: '/orphanages' })
const upload = multer(multerOptions)

routes.get('/',
    validationMiddleware(orphanageValidator.index),
    orphanagesController.index)

routes.get('/:id',
    validationMiddleware(orphanageValidator.show),
    orphanagesController.show)

routes.post('/',
    upload.array('images'),
    validationMiddleware(orphanageValidator.store),
    orphanagesController.store)

routes.put('/:id',
    validationMiddleware(orphanageValidator.update),
    orphanagesController.update)

routes.del('/:id',
    validationMiddleware(orphanageValidator.destroy),
    orphanagesController.destroy)

export default routes
