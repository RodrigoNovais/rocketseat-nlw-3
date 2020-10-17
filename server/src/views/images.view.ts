import Images from '../models/images'

import { PORT } from '../config'

export default {
    render(image: Images) {
        return {
            id: image.id,
            url: `http://192.168.15.16:${PORT}/uploads/${image.path}`,
        }
    },

    renderMany(images: Images[]) {
        return images.map(image => this.render(image))
    },
}
