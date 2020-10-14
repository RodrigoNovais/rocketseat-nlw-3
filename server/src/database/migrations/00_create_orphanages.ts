import Knex from 'knex'

export const up = async (knex: Knex) => {
    return knex.schema.createTable('orphanages', table => {
        table.increments('id').primary()

        table.string('name').notNullable()
        table.text('about').notNullable()
        table.text('instructions').notNullable()

        table.string('opening_hours').notNullable()
        table.boolean('open_on_weekends')
            .defaultTo(false)
            .notNullable()

        table.decimal('latitude', 5).notNullable()
        table.decimal('longitude', 5).notNullable()
    })
}

export const down = async (knex: Knex) => {
    return knex.schema.dropTable('orphanages')
}
