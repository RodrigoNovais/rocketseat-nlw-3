import Knex from 'knex'

export const up = async (knex: Knex) => {
    return knex.schema.createTable('tokens', table => {
        table.increments('id').primary()

        table.string('token')
            .unique()
            .index()
            .notNullable()

        table.enum('type', [
            'verify-email',
            'forgot-password',
            'forgot-email',
        ]).notNullable()

        table.boolean('revoked')
            .defaultTo(false)

        table.dateTime('expires')
            .notNullable()

        table.integer('user_id')
            .references('id')
            .inTable('users')
            .notNullable()
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
            .index()
    })
}

export const down = async (knex: Knex) => {
    return knex.schema.dropTable('tokens')
}
