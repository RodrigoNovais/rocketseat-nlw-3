import Router from '@koa/router'

import loginController from '../controllers/login.controller'
import registerController from '../controllers/register.controller'
import recoverPasswordController from '../controllers/recover.password.controller'
import redefinePasswordController from '../controllers/redefine.password.controller'

import authValidator from '../validators/auth.validator'
import recoverValidator from '../validators/recover.validator'
import validationMiddleware from '../middlewares/validation.middleware'

const routes = new Router()

routes.post('/register',
    validationMiddleware(authValidator.register),
    registerController.store)

routes.post('/login',
    validationMiddleware(authValidator.login),
    loginController.show)

routes.post('/forgot/password',
    validationMiddleware(recoverValidator.recoverPassword),
    recoverPasswordController.show)

routes.post('/redefine/password',
    validationMiddleware(recoverValidator.redefinePassword),
    redefinePasswordController.show)

export default routes
