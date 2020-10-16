import React from 'react'
import { Feather } from '@expo/vector-icons'

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps'

import mapMarker from './src/assets/images/map-marker.png'

export default function App() {
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

const styles = StyleSheet.create({
    container: { flex: 1 },

    map: { flex: 1 },

    calloutContainer: {
        width: 160,
        height: 46,
        paddingHorizontal: 16,
        backgroundColor: '#FFFFFFCC',
        borderRadius: 16,
        justifyContent: 'center',
    },

    calloutText: {
        color: '#0089A5',
        fontSize: 14,
    },

    footer: {
        position: 'absolute',
        left: 24,
        right: 24,
        bottom: 32,

        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        height: 56,
        paddingLeft: 24,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        elevation: 3,
    },

    footerText: {
        color: '#8FA7B3',
    },

    createOrphanageButton: {
        width: 56,
        height: 56,

        backgroundColor: '#15C3D6',
        borderRadius: 20,

        justifyContent: 'center',
        alignItems: 'center',
    },
})
