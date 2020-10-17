import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import OrphanageData from './OrphanageData'
import SelectMapPosition from './SelectMapPosition'

const { Navigator, Screen } = createStackNavigator()

export default () => (
    <Navigator screenOptions={{ headerShown: false }}>
        <Screen name='SelectMapPosition' component={SelectMapPosition} />

        <Screen name='OrphanageData' component={OrphanageData} />
    </Navigator>
)
