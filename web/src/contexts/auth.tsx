import React, { createContext, useState, useEffect, useContext } from 'react'

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
    signIn: (credentials: SignInCredentials, remember: boolean) => Promise<void>
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
            const token = localStorage.getItem('@auth:token')
            const user = localStorage.getItem('@auth:user')

            if (user && token) {
                api.defaults.headers['Authorization'] = `Bearer ${token}`

                setUser(JSON.parse(user))
            }

            setLoading(false)
        }

        loadStorageData()
    }, [])

    const storeAuthData = async (user: User, token: string, remember: boolean) => {
        if (remember) {
            localStorage.setItem('@auth:token', token)
            localStorage.setItem('@auth:user', JSON.stringify(user))
        }

        api.defaults.headers['Authorization'] = `Bearer ${token}`

        setLoading(false)
        setUser(user)
    }

    const register = async (credentials: RegisterCredentials) => {
        setLoading(true)

        api.post<User>('register', credentials)
    }

    const signIn = async (credentials: SignInCredentials, remember: boolean) => {
        setLoading(true)

        api.post<User>('login', credentials)
            .then(response => storeAuthData(response.data, response.headers['Authorization'], remember))
    }

    const signOut = async () => {
        localStorage.clear()

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
