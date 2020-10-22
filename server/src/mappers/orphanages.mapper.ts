import Orphanages from '../models/orphanages'

import ImagesMapper from './images.mapper'

export default {
    render(orphanage: Orphanages) {
        return {
            id: orphanage.id,
            name: orphanage.name,
            about: orphanage.about,
            instructions: orphanage.instructions,
            opening_hours: orphanage.opening_hours,
            open_on_weekends: orphanage.open_on_weekends,
            latitude: orphanage.latitude,
            longitude: orphanage.longitude,
            images: ImagesMapper.renderMany(orphanage.images || []),
        }
    },

    renderMany(orphanages: Orphanages[]) {
        return orphanages.map(orphanage => this.render(orphanage))
    },
}
