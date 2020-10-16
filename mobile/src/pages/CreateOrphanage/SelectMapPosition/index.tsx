import React from 'react'
import { View, Text } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'
import MapView, { Marker } from 'react-native-maps'

import mapMarkerImg from '../../../assets/images/map-marker.png'

import styles from './styles'

export default function SelectMapPosition() {
    const navigation = useNavigation()

    const handleNextStep = () => {
        navigation.navigate('OrphanageData')
    }

    return (
        <View style={styles.container}>
            <MapView style={styles.mapStyle} initialRegion={{ latitude: -27.2092052, longitude: -49.6401092, latitudeDelta: 0.008, longitudeDelta: 0.008 }}>
                <Marker icon={mapMarkerImg} coordinate={{ latitude: -27.2092052, longitude: -49.6401092 }} />
            </MapView>

            <RectButton style={styles.nextButton} onPress={handleNextStep}>
                <Text style={styles.nextButtonText}>Próximo</Text>
            </RectButton>
        </View>
    )
}
