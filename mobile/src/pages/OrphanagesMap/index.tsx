import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'

import { Text, View } from 'react-native'
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps'

import { Feather } from '@expo/vector-icons'

import mapMarker from '../../assets/images/map-marker.png'

import styles from './styles'

const OrphanagesMap: React.FC = () => {
    const navigation = useNavigation()

    const handleNavigateToOrphanageDetails = () => {
        navigation.navigate('OrphanageDetails')
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
                <Marker icon={mapMarker} calloutAnchor={{ x: 2.8, y: 0.8 }} coordinate={{
                    latitude: -23.7231993,
                    longitude: -46.5799926,
                }}>
                    <Callout tooltip onPress={handleNavigateToOrphanageDetails}>
                        <View style={styles.calloutContainer}>
                            <Text style={styles.calloutText}>Orfanato</Text>
                        </View>
                    </Callout>
                </Marker>
            </MapView>

            <View style={styles.footer}>
                <Text style={styles.footerText}>2 orfanatos encontrados</Text>

                <RectButton style={styles.createOrphanageButton} onPress={handleNavigateToCreateOrphanage}>
                    <Feather name='plus' size={20} color='#FFFFFF' />
                </RectButton>
            </View>
        </View>
    )
}

export default OrphanagesMap
