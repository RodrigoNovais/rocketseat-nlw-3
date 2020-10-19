import Router from '@koa/router'

import usersController from '../controllers/users.controller'

import userValidator from '../validators/user.validator'
import validationMiddleware from '../middlewares/validation.middleware'

const routes = new Router({ prefix: '/users' })

routes.get('/',
    validationMiddleware(userValidator.index),
    usersController.index)

routes.get('/:id',
    validationMiddleware(userValidator.show),
    usersController.show)

routes.put('/:id',
    validationMiddleware(userValidator.update),
    usersController.update)

routes.del('/:id',
    validationMiddleware(userValidator.destroy),
    usersController.destroy)

export default routes
