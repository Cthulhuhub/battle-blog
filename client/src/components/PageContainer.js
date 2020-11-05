import React, { useEffect } from 'react'
import { Route, useHistory } from 'react-router-dom'
import HomePage from './HomePage'
import Login from './Login'
import UserHomeContainer from './UserHomeContainer'
import { logout } from '../store/auth'
import { useDispatch } from 'react-redux'
import { unsetAllChars } from '../store/chars'
import CharacterFeed from './CharHome'
import PostPage from './PostPage'
import ProfilePage from './ProfilePage'

function Pages() {
    return (
        <>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/character-select' component={UserHomeContainer} />
            <Route exact path='/logout' component={Logout} />
            <Route exact path='/home' component={CharacterFeed} />
            <Route exact path='/posts/:id' component={PostPage} />
            <Route exact path='/chars/:id' component={ProfilePage} />
        </>
    )
}

function Logout() {
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(logout())
        dispatch(unsetAllChars())
    }, [dispatch])

    history.push('/')

    return <></>
}


export default Pages