import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import PrivateRoutes from './PrivateRoutes'

import Landing from '../pages/Landing'
import OrphanagesMap from '../pages/OrphanagesMap'

import Register from '../pages/Register'
import Login from '../pages/Login'

import ForgotPassword from '../pages/ForgotPassword'
import RedefinePassword from '../pages/RedefinePassword'

import CreateOrphanage from '../pages/CreateOrphanage'
import Orphanage from '../pages/Orphanage'

import { AuthProvider } from '../contexts/auth'

// TODO: Prevent user from access login pages when already logged
// TODO: Prevent user from access redefine password by himself
const Routes: React.FC = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Landing} />
                    <Route exact path='/app' component={OrphanagesMap} />

                    <Route exact path='/register' component={Register} />
                    <Route exact path='/login' component={Login} />

                    <Route exact path='/forgot/password' component={ForgotPassword} />
                    <Route exact path='/redefine/password' component={RedefinePassword} />

                    <PrivateRoutes exact path='/orphanages/create' component={CreateOrphanage} />
                    <PrivateRoutes exact path='/orphanages/:id' component={Orphanage} />

                    <Route render={ ({ location }) => <Redirect to={{ pathname: '/', state: { from: location } }} />} />
                </Switch>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default Routes
