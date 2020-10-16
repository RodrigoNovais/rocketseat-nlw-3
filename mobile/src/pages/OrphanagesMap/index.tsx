import React from 'react'
import { Feather } from '@expo/vector-icons'

import { Text, View, TouchableOpacity } from 'react-native'
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps'

import mapMarker from '../../assets/images/map-marker.png'

import styles from './styles'

const OrphanagesMap: React.FC = () => {
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
                    <Callout tooltip>
                        <View style={styles.calloutContainer}>
                            <Text style={styles.calloutText}>Orfanato</Text>
                        </View>
                    </Callout>
                </Marker>
            </MapView>

            <View style={styles.footer}>
                <Text style={styles.footerText}>2 orfanatos encontrados</Text>

                <TouchableOpacity style={styles.createOrphanageButton}>
                    <Feather name='plus' size={20} color='#FFFFFF' />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default OrphanagesMap
