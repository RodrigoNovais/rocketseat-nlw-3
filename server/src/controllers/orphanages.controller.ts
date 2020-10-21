import { Context, Next } from 'koa'

import Orphanages from '../models/orphanages'
import orphanagesMapper from '../mappers/orphanages.mapper'

export const index = async (context: Context, next: Next) => {
    const orphanages = await Orphanages.query()
        .withGraphFetched('images')
        .modifyGraph('images', b => b.select(['id', 'path']))

    context.status = 200
    context.body = orphanagesMapper.renderMany(orphanages)

    return next()
}

export const show = async (context: Context, next: Next) => {
    const orphanage = await Orphanages.query()
        .findById(context.params.id)
        .withGraphFetched('images')
        .modifyGraph('images', b => b.select(['id', 'path']))

    if (orphanage) {
        context.status = 200
        context.body = orphanagesMapper.render(orphanage)

        return next()
    }

    context.status = 404

    return next()
}

export const store = async (context: Context, next: Next) => {
    const { name, about, instructions, opening_hours, open_on_weekends, latitude, longitude } = context.request.body
    const images = context.request.files.map(image => ({ path: image.filename }))

    const orphanage = await Orphanages.transaction(async trx => {
        const insertedGraph = await Orphanages.query(trx)
            .allowGraph('[images]')
            .insertGraph({
                name,
                about,
                instructions,
                opening_hours,
                open_on_weekends: open_on_weekends === 'true',
                latitude: Number(latitude),
                longitude: Number(longitude),
                images
            })
            .withGraphFetched('images')

        return insertedGraph
    })

    context.status = 201
    context.body = orphanagesMapper.render(orphanage)

    return next()
}

export const update = async (context: Context, next: Next) => {
    const orphanage = await Orphanages.query()
        .patchAndFetchById(context.params.id, context.request.body)
        .withGraphFetched('images')

    context.status = 200
    context.body = orphanagesMapper.render(orphanage)

    return next()
}

// TODO: Discard image when orphanage is deleted
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
