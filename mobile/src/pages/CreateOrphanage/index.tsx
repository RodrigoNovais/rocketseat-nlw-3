import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import OrphanageData from './OrphanageData'
import SelectMapPosition from './SelectMapPosition'

import Header from '../../components/Header'

const { Navigator, Screen } = createStackNavigator()

export default () => (
    <Navigator screenOptions={{ headerShown: false }}>
        <Screen name='SelectMapPosition' component={SelectMapPosition} options={{
            headerShown: true,
            header: () => <Header title='Selecione no Mapa' />
        }}/>

        <Screen name='OrphanageData' component={OrphanageData} options={{
            headerShown: true,
            header: () => <Header title='Informe os Dados' />
        }}/>
    </Navigator>
)
