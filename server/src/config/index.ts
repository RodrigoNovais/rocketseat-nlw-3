import path from 'path'

import multer from '@koa/multer'

export const multerOptions: multer.Options = {
    storage: multer.diskStorage({
        destination: path.join(__dirname, '..', '..', 'uploads'),
        filename: (request, file, callback) => {
            const fileName = `${Date.now()}-${file.originalname}`

            callback(null, fileName)
        },
    }),
}

export const PORT = Number(process.env.PORT)
