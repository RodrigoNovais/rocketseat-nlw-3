import React, { useState, useEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'

import { View, Image, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { RectButton, } from 'react-native-gesture-handler'
import CheckBox from '@react-native-community/checkbox'

import { useAuth } from '../../contexts/auth'

import image from '../../assets/images/map-marker.png'

import styles from './styles'

const Login: React.FC = () => {
    const { signIn } = useAuth()
    const navigation = useNavigation()

    const [buttonEnable, setButtonEnable] = useState<boolean>(false)
    const [remember, setRemember] = useState<boolean>(false)

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const emailRef = useRef<TextInput>(null)
    const passwordRef = useRef<TextInput>(null)

    useEffect(() => setButtonEnable(!!email && !!password), [email, password])

    const handleNavigateToForgotPassword = () =>
        navigation.navigate('ForgotPassword', { email })

    const handleNavigateToRegister = () =>
        navigation.navigate('Register', { email, password })

    const handleSubmit = () => {
        signIn({ email, password })
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
                        <Text style={styles.title}>Fazer login</Text>

                        <TouchableOpacity onPress={handleNavigateToRegister}>
                            <Text style={styles.link}>Criar uma conta</Text>
                        </TouchableOpacity>
                    </View>

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

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <CheckBox tintColors={{ true: '#39CC83' }} value={remember} onValueChange={setRemember} />
                            <Text style={styles.link}>Lembrar-me</Text>
                        </View>

                        <TouchableOpacity onPress={handleNavigateToForgotPassword}>
                            <Text style={styles.link}>Esqueci minha senha</Text>
                        </TouchableOpacity>
                    </View>

                    <RectButton enabled={buttonEnable} onPress={handleSubmit}
                        style={[styles.nextButton, buttonEnable ? styles.buttonEnable : styles.buttonDisabled]}>
                        <Text style={styles.nextButtonText}>Entrar</Text>
                    </RectButton>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default Login
