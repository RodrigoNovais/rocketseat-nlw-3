import Knex from 'knex'

export const up = async (knex: Knex) => {
    return knex.schema.createTable('images', table => {
        table.increments('id').primary()

        table.string('path').notNullable()

        table.integer('orphanage_id')
            .references('id')
            .inTable('orphanage')
            .notNullable()
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
    })
}

export const down = async (knex: Knex) => {
    return knex.schema.dropTable('images')
}
