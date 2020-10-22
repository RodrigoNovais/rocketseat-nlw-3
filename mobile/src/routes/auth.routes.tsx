import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import ForgotPassword from '../pages/ForgotPassword'

import Login from '../pages/Login'
import Register from '../pages/Register'

const { Navigator, Screen } = createStackNavigator()

const Routes: React.FC = () => {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name='Login' component={Login} />
            <Screen name='Register' component={Register} />

            <Screen name='ForgotPassword' component={ForgotPassword} />
        </Navigator>
    )
}

export default Routes
