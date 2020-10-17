import React, { useState } from 'react'
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native'
import { ScrollView, View, Switch, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

import * as ImagePicker from 'expo-image-picker'

import { Feather } from '@expo/vector-icons'
import { LatLng } from 'react-native-maps'

import api from '../../../services/api'

import { Orphanage } from '../../../types/Orphanage'

import styles from './styles'

const OrphanageData: React.FC = () => {
    const { params } = useRoute<RouteProp<{ OrphanageData: LatLng }, 'OrphanageData'>>()
    const navigation = useNavigation()

    const [name, setName] = useState<string>('')
    const [about, setAbout] = useState<string>('')
    const [instructions, setInstructions] = useState<string>('')
    const [openingHours, setOpeningHours] = useState<string>('')
    const [whatsapp, setWhatsapp] = useState<string>('')
    const [openOnWeekends, setOpenOnWeekends] = useState<boolean>(false)

    const [images, setImages] = useState<string[]>([])

    const handleCreateOrphanage = async () => {
        const { latitude, longitude } = params

        const data = new FormData()

        data.append('name', name)
        data.append('about', about)
        data.append('latitude', String(latitude))
        data.append('longitude', String(longitude))
        data.append('instructions', instructions)
        data.append('opening_hours', openingHours)
        data.append('open_on_weekends', String(openOnWeekends))

        images.forEach((image, index) => data.append('images', {
            name: `image_${name}_${index}.jpg`,
            type: 'image/jpg',
            uri: image,
        } as any))

        await api.post<Orphanage>('orphanages', data)

        navigation.navigate('OrphanagesMap')
    }

    const handleSelectImages = async () => {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync()

        if (status !== 'granted') return

        const result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, quality: 1, mediaTypes: ImagePicker.MediaTypeOptions.Images })

        if (result.cancelled) return

        setImages(images => [...images, result.uri])
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
            <Text style={styles.title}>Dados</Text>

            <Text style={styles.label}>Nome</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} />

            <Text style={styles.label}>Sobre</Text>
            <TextInput style={[styles.input, { height: 110 }]} multiline value={about} onChangeText={setAbout} />

            <Text style={styles.label}>Whatsapp</Text>
            <TextInput style={styles.input} value={whatsapp} onChangeText={setWhatsapp} />

            <Text style={styles.label}>Fotos</Text>

            <View style={styles.uploadedImagesContainer}>
                {images.map(image => <Image key={image} style={styles.uploadedImage} source={{ uri: image }} />)}
            </View>

            <TouchableOpacity style={styles.imagesInput} onPress={handleSelectImages}>
                <Feather name="plus" size={24} color="#15B6D6" />
            </TouchableOpacity>

            <Text style={styles.title}>Visitação</Text>

            <Text style={styles.label}>Instruções</Text>
            <TextInput style={[styles.input, { height: 110 }]} multiline value={instructions} onChangeText={setInstructions} />

            <Text style={styles.label}>Horario de visitas</Text>
            <TextInput style={styles.input} value={openingHours} onChangeText={setOpeningHours} />

            <View style={styles.switchContainer}>
                <Text style={styles.label}>Atende final de semana?</Text>
                <Switch thumbColor="#fff" trackColor={{ false: '#ccc', true: '#39CC83' }} value={openOnWeekends} onValueChange={setOpenOnWeekends} />
            </View>

            <RectButton style={styles.nextButton} onPress={handleCreateOrphanage}>
                <Text style={styles.nextButtonText}>Cadastrar</Text>
            </RectButton>
        </ScrollView>
    )
}

export default OrphanageData
