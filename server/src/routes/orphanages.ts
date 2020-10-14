import Router from '@koa/router'

import orphanagesController from '../controllers/orphanages.controller'

const routes = new Router({ prefix: '/orphanages' })

routes.get('/', orphanagesController.index)
routes.get('/:id', orphanagesController.show)
routes.post('/', orphanagesController.store)
routes.put('/:id', orphanagesController.update)
routes.del('/:id', orphanagesController.destroy)

export default routes
