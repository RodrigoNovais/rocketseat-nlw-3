import React, { createContext, useState, useEffect, useContext } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import * as SplashScreen from 'expo-splash-screen'

import api from '../services/api'

export type User = {
    id: number
    name: string
    email: string
}

export type SignInCredentials = {
    email: string
    password: string
}

export type RegisterCredentials = {
    name: string
    email: string
    password: string
}

export type AuthContextData = {
    signed: boolean
    loading: boolean
    user?: User
    signIn: (credentials: SignInCredentials) => Promise<void>
    register: (credentials: RegisterCredentials) => Promise<void>
    signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context)
        throw new Error('useAuth must be used within an AuthProvider')

    return context
}

export const AuthProvider: React.FC = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(true)
    const [user, setUser] = useState<User>()

    useEffect(() => {
        const loadStorageData = async () => {
            await SplashScreen.preventAutoHideAsync()
            const [[,token], [,user]] = await AsyncStorage.multiGet(['@auth:token', '@auth:user'])

            if (user && token) {
                api.defaults.headers['Authorization'] = `Bearer ${token}`

                setUser(JSON.parse(user))
            }

            setLoading(false)
            await SplashScreen.hideAsync()
        }

        loadStorageData()
    }, [])

    const storeAuthData = async (user: User, token: string) => {
        await AsyncStorage.multiSet([
            ['@auth:token', token],
            ['@auth:user', JSON.stringify(user)]
        ])

        api.defaults.headers['Authorization'] = `Bearer ${token}`

        setLoading(false)
        setUser(user)
    }

    const register = async (credentials: RegisterCredentials) => {
        setLoading(true)

        api.post<User>('register', credentials)
    }

    const signIn = async (credentials: SignInCredentials) => {
        setLoading(true)

        api.post<User>('login', credentials)
            .then(response => storeAuthData(response.data, response.headers['Authorization']))
    }

    const signOut = async () => {
        await AsyncStorage.clear()

        api.defaults.headers['Authorization'] = undefined
        setUser(undefined)
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, loading, signIn, register, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
