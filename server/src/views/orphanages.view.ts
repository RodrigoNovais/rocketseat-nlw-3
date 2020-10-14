import Orphanages from '../models/orphanages'

import ImagesView from './images.view'

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
            images: ImagesView.renderMany(orphanage.images || []),
        }
    },

    renderMany(orphanages: Orphanages[]) {
        return orphanages.map(orphanage => this.render(orphanage))
    },
}
