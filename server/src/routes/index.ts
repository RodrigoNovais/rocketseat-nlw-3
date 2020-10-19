import compose from 'koa-compose'
import Router from '@koa/router'

import orphanages from './orphanages'
import users from './users'

function combine(...routers: Router[]) {
    if (!Array.isArray(routers))
        routers = [...arguments]

    const middleware: Array<any> = []

    routers.forEach(router => {
        middleware.push(router.routes())
        middleware.push(router.allowedMethods())
    })

    return compose(middleware)
}

export default combine(orphanages, users)
