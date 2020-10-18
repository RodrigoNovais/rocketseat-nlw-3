import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: { flex: 1 },

    title: {
        color: '#5C8599',
        fontSize: 24,
        fontFamily: 'Nunito_700Bold',
        marginBottom: 32,
        paddingBottom: 24,
        borderBottomWidth: 0.8,
        borderBottomColor: '#D3E2E6'
    },

    label: {
        color: '#8FA7B3',
        fontFamily: 'Nunito_600SemiBold',
        marginBottom: 8,
    },

    comment: {
        fontSize: 11,
        color: '#8FA7B3',
    },

    input: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1.4,
        borderColor: '#D3E2E6',
        borderRadius: 20,
        height: 56,
        paddingVertical: 18,
        paddingHorizontal: 24,
        marginBottom: 16,
        textAlignVertical: 'top',
    },

    uploadedImagesContainer: { flexDirection: 'row' },

    uploadedImage: {
        width: 64,
        height: 64,
        borderRadius: 20,
        marginBottom: 32,
        marginRight: 8,
    },

    imageWrapper: {
        width: 64,
        height: 64,

        borderRadius: 20,
        marginBottom: 32,
        marginRight: 8,
    },

    imageRemove: {
        position: 'absolute',
        top: 0,
        right: 0,

        width: 32,
        height: 32,

        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#D3E2E5',

        overflow: 'hidden',

        borderTopLeftRadius: 0,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 20,

        justifyContent: 'center',
        alignItems: 'center',
    },

    imagesInput: {
        backgroundColor: '#FFFFFF80',
        borderStyle: 'dashed',
        borderColor: '#96D2F0',
        borderWidth: 1.4,
        borderRadius: 20,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
    },

    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    nextButton: {
        backgroundColor: '#15C3D6',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,
        marginTop: 32,
    },

    nextButtonText: {
        fontFamily: 'Nunito_800ExtraBold',
        fontSize: 16,
        color: '#FFFFFF',
    }
})
