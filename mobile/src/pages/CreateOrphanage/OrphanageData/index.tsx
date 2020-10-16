import React from 'react'
import { ScrollView, View, Switch, Text, TextInput, TouchableOpacity } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

import { Feather } from '@expo/vector-icons'

import styles from './styles'

export default function OrphanageData() {
    return (
        <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
            <Text style={styles.title}>Dados</Text>

            <Text style={styles.label}>Nome</Text>
            <TextInput style={styles.input} />

            <Text style={styles.label}>Sobre</Text>
            <TextInput style={[styles.input, { height: 110 }]} multiline />

            <Text style={styles.label}>Whatsapp</Text>
            <TextInput style={styles.input} />

            <Text style={styles.label}>Fotos</Text>
            <TouchableOpacity style={styles.imagesInput} onPress={() => {}}>
                <Feather name="plus" size={24} color="#15B6D6" />
            </TouchableOpacity>

            <Text style={styles.title}>Visitação</Text>

            <Text style={styles.label}>Instruções</Text>
            <TextInput style={[styles.input, { height: 110 }]} multiline />

            <Text style={styles.label}>Horario de visitas</Text>
            <TextInput style={styles.input} />

            <View style={styles.switchContainer}>
                <Text style={styles.label}>Atende final de semana?</Text>
                <Switch thumbColor="#fff" trackColor={{ false: '#ccc', true: '#39CC83' }}/>
            </View>

            <RectButton style={styles.nextButton} onPress={() => {}}>
                <Text style={styles.nextButtonText}>Cadastrar</Text>
            </RectButton>
        </ScrollView>
    )
}
