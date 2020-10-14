import { ValidationError } from 'joi'

interface Errors {
    [key: string]: string[]
}

export default function getValidationErrors(errors: ValidationError): Errors {
    const validationErrors: Errors = {}

    errors.details.forEach(error => {
        const [path] = error.path

        if (!validationErrors[path])
            validationErrors[path] = []

        validationErrors[path].push(error.message)
    })

    return validationErrors
}
