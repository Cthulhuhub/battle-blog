import React from 'react'
import { Route } from 'react-router-dom'
import HomePage from './HomePage'
import Login from './Login'
import UserHomeContainer from './UserHomeContainer'

function Pages() {
    return (
        <>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/home' component={UserHomeContainer} />
        </>
    )
}

export default Pages