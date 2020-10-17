import React from 'react'
import { useNavigation } from '@react-navigation/native'

import { View, Text } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'

import { Feather } from '@expo/vector-icons'

import styles from './styles'

export type HeaderProps = {
    showCancel?: boolean
    title: React.ReactText
}

const Header: React.FC<HeaderProps> = ({ title, showCancel = true }) => {
    const navigation = useNavigation()

    const handleGoBackToHomePage = () => navigation.navigate('OrphanagesMap')

    return (
        <View style={styles.container}>
            <BorderlessButton onPress={navigation.goBack}>
                <Feather name='arrow-left' size={24} color='#15B6D6' />
            </BorderlessButton>

            <Text style={styles.title}>{title}</Text>

            { showCancel ? (
                <BorderlessButton onPress={handleGoBackToHomePage}>
                    <Feather name='x' size={24} color='#FF669D' />
                </BorderlessButton>
            ) : <View style={{ height: 24, width: 24 }} /> }
        </View>
    )
}

export default Header
