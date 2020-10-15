import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { FiArrowRight, FiPlus } from 'react-icons/fi'

import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

import mapMarkerImg from '../images/map-marker.svg'
import { mapIcon } from '../utils/mapIcon'

import api from '../services/api'
import { Orphanage } from '../types/Orphanage'

import '../styles/pages/orphanages-map.css'

const OrphanagesMap: React.FC = () => {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([])

    useEffect(() => {
        api.get<Orphanage[]>('orphanages')
            .then(response => setOrphanages(response.data))
    }, [])

    return (
        <div id='page-map'>
            <aside>
                <header>
                    <img src={mapMarkerImg} alt='Happy' />

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>São Bernardo do Campo</strong>
                    <span>São Paulo</span>
                </footer>
            </aside>

            <Map center={[-23.7231993,-46.5799926]} zoom={15} style={{ width: '100%', height: '100%', zIndex: 0 }}>
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

                { orphanages.map(orphanage => (
                    <Marker key={orphanage.id} position={[orphanage.latitude, orphanage.longitude]} icon={mapIcon}>
                        <Popup closeButton={false} minWidth={240} maxWidth={240} className='map-popup'>
                            {orphanage.name}
                            <Link to={`orphanages/${orphanage.id}`}>
                                <FiArrowRight size={20} color='#FFFFFF' />
                            </Link>
                        </Popup>
                    </Marker>
                )) }
            </Map>

            <Link to='orphanages/create' className='create-orphanage'>
                <FiPlus size={32} color='#FFFFFF' />
            </Link>
        </div>
    )
}

export default OrphanagesMap
