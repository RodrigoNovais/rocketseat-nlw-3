import React, { useState, useEffect, useRef } from 'react'
import { useRoute, RouteProp } from '@react-navigation/native'

import { View, Image, Text, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

import { useAuth } from '../../contexts/auth'

import image from '../../assets/images/map-marker.png'

import styles from './styles'

const Register: React.FC = () => {
    const { register } = useAuth()
    const { params } = useRoute<RouteProp<{ Register: { email: string, password: string } }, 'Register'>>()

    const [buttonEnable, setButtonEnable] = useState<boolean>(false)

    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>(params.email)
    const [password, setPassword] = useState<string>(params.password)

    const nameRef = useRef<TextInput>(null)
    const emailRef = useRef<TextInput>(null)
    const passwordRef = useRef<TextInput>(null)

    useEffect(() => setButtonEnable(!!name && !!email && !!password), [name, email, password])

    const handleSubmit = () => {
        register({ name, email, password })
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
                    <Text style={styles.title}>Registrar</Text>

                    <Text style={styles.label}>Nome</Text>
                    <TextInput ref={nameRef} style={styles.input} autoCompleteType='name' autoCapitalize='words'
                        disableFullscreenUI keyboardType='name-phone-pad' returnKeyType='next'
                        blurOnSubmit={false} onSubmitEditing={() => emailRef.current?.focus()}
                        value={name} onChangeText={setName} />

                    <Text style={styles.label}>Email</Text>
                    <TextInput ref={emailRef} style={styles.input} autoCompleteType='email' autoCapitalize='none'
                        disableFullscreenUI keyboardType='email-address' returnKeyType='next'
                        blurOnSubmit={false} onSubmitEditing={() => passwordRef.current?.focus()}
                        value={email} onChangeText={setEmail} />

                    <Text style={styles.label}>Senha</Text>
                    <TextInput ref={passwordRef} style={styles.input} autoCompleteType='password' autoCapitalize='none'
                        disableFullscreenUI keyboardType='default' onSubmitEditing={handleSubmit}
                        autoCorrect={false} secureTextEntry
                        value={password} onChangeText={setPassword} />

                    <RectButton enabled={buttonEnable} onPress={handleSubmit}
                        style={[styles.nextButton, buttonEnable ? styles.buttonEnable : styles.buttonDisabled]}>
                        <Text style={styles.nextButtonText}>Enviar</Text>
                    </RectButton>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default Register
