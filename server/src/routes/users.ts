import Router from '@koa/router'

import usersController from '../controllers/users.controller'

import userValidator from '../validators/user.validator'

import authenticationMiddleware from '../middlewares/authentication.middleware'
import validationMiddleware from '../middlewares/validation.middleware'

const routes = new Router({ prefix: '/users' })

routes.get('/',
    authenticationMiddleware,
    validationMiddleware(userValidator.index),
    usersController.index)

routes.get('/:id',
    authenticationMiddleware,
    validationMiddleware(userValidator.show),
    usersController.show)

routes.put('/:id',
    authenticationMiddleware,
    validationMiddleware(userValidator.update),
    usersController.update)

routes.del('/:id',
    authenticationMiddleware,
    validationMiddleware(userValidator.destroy),
    usersController.destroy)

export default routes
