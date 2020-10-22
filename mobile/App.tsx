import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import { useFonts } from 'expo-font'
import { Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold } from '@expo-google-fonts/nunito'

import { AuthProvider } from './src/contexts/auth'

import Routes from './src/routes'

const App: React.FC = () => {
    const [fontsLoaded] = useFonts({
        Nunito_600SemiBold,
        Nunito_700Bold,
        Nunito_800ExtraBold,
    })

    if (!fontsLoaded) return null

    return (
        <AuthProvider>
            <NavigationContainer>
                <Routes />
            </NavigationContainer>
        </AuthProvider>
    )
}

export default App
