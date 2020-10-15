import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { FaWhatsapp } from 'react-icons/fa'
import { FiClock, FiInfo } from 'react-icons/fi'

import { Map, Marker, TileLayer } from 'react-leaflet'

import Sidebar from '../components/Sidebar'

import { mapIcon } from '../utils/mapIcon'

import api from '../services/api'
import { Orphanage as OrphanageType } from '../types/Orphanage'

import '../styles/pages/orphanage.css'

type RouteParams = {
    id: string
}

const Orphanage: React.FC = () => {
    const params = useParams<RouteParams>()

    const [activeImageIndex, setActiveImageIndex] = useState<number>(0)
    const [orphanage, setOrphanage] = useState<OrphanageType>()

    useEffect(() => {
        api.get<OrphanageType>(`orphanages/${params.id}`)
            .then(response => setOrphanage(response.data))
    }, [params.id])

    return (
        <div id='page-orphanage'>
            <Sidebar />

            <main>
                <div className='orphanage-details'>
                    <img src={orphanage?.images[activeImageIndex].url} alt={orphanage?.name} />

                    <div className='images'>
                        { orphanage?.images.map((image, index) => (
                            <button key={image.id} onClick={() => { setActiveImageIndex(index) }}
                                className={ activeImageIndex === index ? 'active' : ''} type='button'>
                                <img src={image.url} alt={orphanage.name} />
                            </button>
                        )) }
                    </div>

                    <div className='orphanage-details-content'>
                        <h1>{orphanage?.name}</h1>
                        <p>{orphanage?.about}</p>

                        <div className='map-container'>
                            <Map
                                center={[orphanage?.latitude ?? 0, orphanage?.longitude ?? 0]}
                                zoom={16}
                                style={{ width: '100%', height: 280 }}
                                dragging={false}
                                touchZoom={false}
                                zoomControl={false}
                                scrollWheelZoom={false}
                                doubleClickZoom={false} >

                                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
                                <Marker interactive={false} icon={mapIcon} position={[orphanage?.latitude ?? 0, orphanage?.longitude ?? 0]} />
                            </Map>

                            <footer>
                                <a target='_blank' rel='noopener noreferrer'
                                    href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage?.latitude},${orphanage?.longitude}`}>
                                    Ver rotas no Google Maps
                                </a>
                            </footer>
                        </div>

                        <hr />

                        <h2>Instruções para visita</h2>
                        <p>{orphanage?.instructions}</p>

                        <div className='open-details'>
                            <div className='hour'>
                                <FiClock size={32} color='#15B6D6' />
                                Segunda à Sexta <br />
                                {orphanage?.opening_hours}
                            </div>

                            {orphanage?.open_on_weekends ? (
                                <div className='open-on-weekends'>
                                    <FiInfo size={32} color='#39CC83' />
                                    Atendemos <br />
                                    fim de semana
                                </div>
                            ) : (
                                <div className='dont-open-on-weekends'>
                                    <FiInfo size={32} color='#FF669D' />
                                    Não atendemos <br />
                                    fim de semana
                                </div>
                            )}
                        </div>

                        <button type='button' className='contact-button'>
                            <FaWhatsapp size={20} color='#FFFFFF' />
                            Entrar em contato
                        </button>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Orphanage
