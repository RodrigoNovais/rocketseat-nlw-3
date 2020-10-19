import Router from '@koa/router'

import loginController from '../controllers/login.controller'
import registerController from '../controllers/register.controller'
import recoverPasswordController from '../controllers/recover.password.controller'
import recoverEmailController from '../controllers/recover.email.controller'

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

routes.post('/forgot/email',
    validationMiddleware(recoverValidator.recoverEmail),
    recoverEmailController.show)

export default routes
