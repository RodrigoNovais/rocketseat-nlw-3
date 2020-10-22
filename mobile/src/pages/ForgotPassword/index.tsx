import React, { useState, useEffect } from 'react'
import { useRoute, RouteProp } from '@react-navigation/native'

import { View, ScrollView, KeyboardAvoidingView, Platform, Image, Text, TextInput } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

import api from '../../services/api'

import image from '../../assets/images/map-marker.png'

import styles from './styles'

const ForgotPassword: React.FC = () => {
    const { params } = useRoute<RouteProp<{ ForgotPassword: { email: string } }, 'ForgotPassword'>>()

    const [buttonEnable, setButtonEnable] = useState<boolean>(false)

    const [email, setEmail] = useState<string>(params.email)

    useEffect(() => setButtonEnable(!!email), [email])

    const handleSubmit = () => {
        api.post('forgot/password', { email })
            .then()
            .catch()
    }

    return (
        <ScrollView style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : undefined}>
                <View style={styles.banner}>
                    <Image source={image} />
                </View>

                <View style={styles.form}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Esqueci a senha</Text>

                        <Text style={styles.tip}>Sua redefinição de senha será enviada para o e-mail cadastrado.</Text>
                    </View>

                    <Text style={styles.label}>Email</Text>
                    <TextInput style={styles.input} autoCompleteType='email' autoCapitalize='none'
                        disableFullscreenUI keyboardType='email-address' onSubmitEditing={handleSubmit}
                        value={email} onChangeText={setEmail} />

                    <RectButton enabled={buttonEnable} onPress={handleSubmit}
                        style={[styles.nextButton, buttonEnable ? styles.buttonEnable : styles.buttonDisabled]}>
                        <Text style={styles.nextButtonText}>Enviar</Text>
                    </RectButton>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default ForgotPassword
