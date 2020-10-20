import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'

import { useAuth } from '../contexts/auth'

const PrivateRoutes: React.FC<RouteProps> = ({ component: Component, ...rest }) => {
    const { signed } = useAuth()

    if (!Component) return null

    return <Route {...rest} render={
        props => signed ?
            <Component {...props} /> :
            <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    } />
}

export default PrivateRoutes
