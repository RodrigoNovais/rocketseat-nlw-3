import { StyleSheet } from 'react-native'

export default StyleSheet.create({
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
        fontFamily: 'Nunito_700Bold',
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
