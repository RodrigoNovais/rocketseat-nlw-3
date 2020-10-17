import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import CreateOrphanage from '../pages/CreateOrphanage'

import OrphanagesDetails from '../pages/OrphanageDetails'
import OrphanagesMap from '../pages/OrphanagesMap'

const { Navigator, Screen } = createStackNavigator()

const Routes: React.FC = () => {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#F2F3F5' } }}>
                <Screen name='OrphanagesMap' component={OrphanagesMap} />
                <Screen name='OrphanageDetails' component={OrphanagesDetails} />

                <Screen name='CreateOrphanage' component={CreateOrphanage} />
            </Navigator>
        </NavigationContainer>
    )
}

export default Routes
