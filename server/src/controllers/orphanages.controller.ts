import { Context, Next } from 'koa'

import Orphanages from '../models/orphanages'

export const index = async (context: Context, next: Next) => {
    const orphanages = await Orphanages.query()
        .withGraphFetched('images')

    context.status = 200
    context.body = orphanages

    return next()
}

export const show = async (context: Context, next: Next) => {
    const orphanage = await Orphanages.query()
        .findById(context.params.id)
        .withGraphFetched('images')

    if (orphanage) {
        context.status = 200
        context.body = orphanage

        return next()
    }

    context.status = 404

    return next()
}

export const store = async (context: Context, next: Next) => {
    const insertedGraph = await Orphanages.query()
        .insertGraph(context.request.body)
        .withGraphFetched('images')

    context.status = 201
    context.body = insertedGraph

    return next()
}

export const update = async (context: Context, next: Next) => {
    const updatedOrphanage = await Orphanages.query()
        .patchAndFetchById(context.params.id, context.request.body)
        .withGraphFetched('images')

    context.status = 200
    context.body = updatedOrphanage

    return next()
}

export const destroy = async (context: Context, next: Next) => {
    const numDeleted = await Orphanages.query()
        .deleteById(context.params.id)

    if (numDeleted) {
        context.status = 204

        return next()
    }

    context.status = 400

    return next()
}

export default { index, show, store, update, destroy }
