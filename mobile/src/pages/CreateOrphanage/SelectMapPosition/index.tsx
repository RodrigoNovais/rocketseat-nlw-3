import React, { useState } from 'react'
import { View, Text } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'
import MapView, { Marker, MapEvent, LatLng } from 'react-native-maps'

import mapMarkerImg from '../../../assets/images/map-marker.png'

import styles from './styles'

const SelectMapPosition: React.FC = () => {
    const navigation = useNavigation()
    const [position, setPosition] = useState<LatLng>()

    const handleNextStep = () => {
        navigation.navigate('OrphanageData', position)
    }

    const handleSelectMapPosition = (e: MapEvent) => {
        setPosition(e.nativeEvent.coordinate)
    }

    return (
        <View style={styles.container}>
            <MapView style={styles.mapStyle} onPress={handleSelectMapPosition}
                initialRegion={{ latitude: -23.7231993, longitude: -46.5799926, latitudeDelta: 0.022, longitudeDelta: 0.022 }}>

                { !!position && <Marker icon={mapMarkerImg} coordinate={position} /> }
            </MapView>

            { !!position && (
                <RectButton style={styles.nextButton} onPress={handleNextStep}>
                    <Text style={styles.nextButtonText}>Próximo</Text>
                </RectButton>
            )}
        </View>
    )
}

export default SelectMapPosition
