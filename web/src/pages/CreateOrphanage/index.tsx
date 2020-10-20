import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { FiPlus, FiX } from 'react-icons/fi'

import { Map, Marker, TileLayer } from 'react-leaflet'
import { LeafletMouseEvent } from 'leaflet'

import Sidebar from '../../components/Sidebar'

import { mapIcon } from '../../utils/mapIcon'

import api from '../../services/api'

import './styles.css'

const CreateOrphanage: React.FC = () => {
    const history = useHistory()

    const [position, setPosition] = useState({ latitude: 0, longitude: 0 })

    const [name, setName] = useState<string>('')
    const [about, setAbout] = useState<string>('')
    const [instructions, setInstructions] = useState<string>('')
    const [openingHours, setOpeningHours] = useState<string>('')
    const [openOnWeekends, setOpenOnWeekends] = useState<boolean>(false)
    const [images, setImages] = useState<File[]>([])

    const [previewImages, setPreviewImages] = useState<string[]>([])

    const handleMapClick = (e: LeafletMouseEvent) => {
        setPosition({
            latitude: e.latlng.lat,
            longitude: e.latlng.lng,
        })
    }

    const handleSelectImages = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return

        const selectedImages = Array.from(e.target.files)
        setImages(images => [...images, ...selectedImages])

        const selectedImagesPreview = selectedImages.map(image => URL.createObjectURL(image))
        setPreviewImages(previews => [...previews, ...selectedImagesPreview])
    }

    const handleRemoveImage = (index: number) => {
        setImages(images => images.filter((_, i) => i !== index))
        setPreviewImages(previews => previews.filter((_, i) => i !== index))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const { latitude, longitude } = position

        const data = new FormData()

        data.append('name', name)
        data.append('about', about)
        data.append('latitude', String(latitude))
        data.append('longitude', String(longitude))
        data.append('instructions', instructions)
        data.append('opening_hours', openingHours)
        data.append('open_on_weekends', String(openOnWeekends))

        images.forEach(image => data.append('images', image))

        await api.post('orphanages', data)

        history.push('/app')
    }

    // TODO: show character counter/limit indicator for input and textarea
    return (
        <div id='page-create-orphanage'>
            <Sidebar />

            <main>
                <form onSubmit={handleSubmit} className='create-orphanage-form'>
                    <fieldset>
                        <legend>Informações</legend>

                        <Map center={[-23.7231993,-46.5799926]} zoom={12} style={{ width: '100%', height: 280 }} onclick={handleMapClick}>
                            <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

                            { position.latitude !== 0 && <Marker interactive={false} icon={mapIcon} position={[position.latitude, position.longitude]} /> }
                        </Map>

                        <div className='input-block'>
                            <label htmlFor='name'>Nome</label>
                            <input id='name' name='name' maxLength={255} value={name} onChange={e => setName(e.target.value)} />
                        </div>

                        <div className='input-block'>
                            <label htmlFor='about'>Sobre <span>Máximo de 300 caracteres</span></label>
                            <textarea id='about' name='about' maxLength={65535} value={about} onChange={e => setAbout(e.target.value)} />
                        </div>

                        <div className='input-block'>
                            <label htmlFor='images'>Fotos</label>

                            <div className='images-container'>
                                { previewImages.map((image, index) => (
                                    <div className='images-wrapper'>
                                        <button type='button' className='remove' onClick={() => handleRemoveImage(index)}>
                                            <FiX size={24} color='#FF669D' />
                                        </button>
                                        <img key={image} src={image} alt={name} />
                                    </div>
                                )) }

                                <label htmlFor='image[]' className='new-image'>
                                    <FiPlus size={24} color='#15B6D6' />
                                </label>
                            </div>

                            <input multiple onChange={handleSelectImages} type="file" id='image[]' />
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Visitação</legend>

                        <div className='input-block'>
                            <label htmlFor='instructions'>Instruções</label>
                            <textarea id='instructions' name='instructions' maxLength={65535} value={instructions} onChange={e => setInstructions(e.target.value)} />
                        </div>

                        <div className='input-block'>
                            <label htmlFor='opening_hours'>Horário de Funcionamento</label>
                            <input id='opening_hours' name='opening_hours' maxLength={255} value={openingHours} onChange={e => setOpeningHours(e.target.value)} />
                        </div>

                        <div className='input-block'>
                            <label htmlFor='open_on_weekends'>Atende fim de semana</label>

                            <div className='button-select'>
                                <button type='button' id='positive' className={openOnWeekends ? 'active' : ''} onClick={() => setOpenOnWeekends(true)}>Sim</button>
                                <button type='button' id='negative' className={openOnWeekends ? '' : 'active'} onClick={() => setOpenOnWeekends(false)}>Não</button>
                            </div>
                        </div>
                    </fieldset>

                    <button className='confirm-button' type='submit'>
                        Confirmar
                    </button>
                </form>
            </main>
        </div>
    )
}

export default CreateOrphanage
