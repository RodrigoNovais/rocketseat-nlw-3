import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'

import { Text, View } from 'react-native'
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps'

import { Feather } from '@expo/vector-icons'

import api from '../../services/api'

import mapMarker from '../../assets/images/map-marker.png'

import { Orphanage } from '../../types/Orphanage'

import styles from './styles'

const OrphanagesMap: React.FC = () => {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([])
    const navigation = useNavigation()

    useEffect(() => {
        api.get<Orphanage[]>('orphanages')
            .then(response => setOrphanages(response.data))
    }, [])

    const handleNavigateToOrphanageDetails = (orphanage: Orphanage) => {
        navigation.navigate('OrphanageDetails', orphanage)
    }

    const handleNavigateToCreateOrphanage = () => {
        navigation.navigate('CreateOrphanage')
    }

    return (
        <View style={styles.container}>
            <MapView style={styles.map} provider={PROVIDER_GOOGLE} initialRegion={{
                latitude: -23.7231993,
                longitude: -46.5799926,
                latitudeDelta: 0.022,
                longitudeDelta: 0.022,
            }}>
                { orphanages.map(orphanage => (
                    <Marker key={orphanage.id} icon={mapMarker} calloutAnchor={{ x: 2.8, y: 0.8 }} coordinate={{
                        latitude: orphanage.latitude,
                        longitude: orphanage.longitude,
                    }}>
                        <Callout tooltip onPress={() => handleNavigateToOrphanageDetails(orphanage)}>
                            <View style={styles.calloutContainer}>
                                <Text style={styles.calloutText}>{orphanage.name}</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>

            <View style={styles.footer}>
                <Text style={styles.footerText}>{orphanages.length} orfanatos encontrados</Text>

                <RectButton style={styles.createOrphanageButton} onPress={handleNavigateToCreateOrphanage}>
                    <Feather name='plus' size={20} color='#FFFFFF' />
                </RectButton>
            </View>
        </View>
    )
}

export default OrphanagesMap
