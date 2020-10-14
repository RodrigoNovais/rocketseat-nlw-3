import { Context, Next } from 'koa'

import { ValidationError } from 'joi'
import {
    NotFoundError,
    DBError,
    UniqueViolationError,
    NotNullViolationError,
    ForeignKeyViolationError,
    CheckViolationError,
    DataError,
} from 'objection'

export default () => {
    return async (context: Context, next: Next) => {
        let output
        try {
            await next()

            output = context.body
        } catch (error) {
            /** Objection Errors */
            if (error instanceof NotFoundError) {
                console.error(`type: {${error.type}}`, error.message, error.data)

                context.status = 404
                return
            }

            if (error instanceof UniqueViolationError) {
                console.error(`type: {UniqueViolationError}`, error.message, {
                    columns: error.columns,
                    table: error.table,
                    constraint: error.constraint
                })

                context.status = 409
                return
            }

            if (error instanceof NotNullViolationError) {
                console.error(`type: {NotNullViolationError}`, error.message, {
                    column: error.column,
                    table: error.table,
                })

                context.status = 400
                return
            }

            if (error instanceof ForeignKeyViolationError) {
                console.error(`type: {ForeignKeyViolationError}`, error.message, {
                    table: error.table,
                    constraint: error.constraint,
                })

                context.status = 409
                return
            }

            if (error instanceof CheckViolationError) {
                console.error(`type: {CheckViolationError}`, error.message, {
                    table: error.table,
                    constraint: error.constraint,
                })

                context.status = 400
                return
            }

            if (error instanceof DataError) {
                console.error(`type: {InvalidDataError}`, error.message)

                context.status = 400
                return
            }

            if (error instanceof DBError) {
                console.error(`type: {UnknownDatabaseError}`, error.message)

                context.status = 500
                return
            }

            console.error(`type: {UnknownError}`, error)

            context.status = 500
            return
        }
    }
}
