import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { loadUser } from '../store/auth'

function Navbar() {
    const user = useSelector(state => state.auth.user)

    const dispatch = useDispatch()

    useEffect(() => {
        if (!user) {
            dispatch(loadUser())
        }
    }, [dispatch, user])

    return (
        <div className='navbar'>
            <ul>
                <li><NavLink to={ user ? '/logout' : '/login'}>{ user ? 'Logout' : 'Login'}</NavLink></li>
                <li><NavLink to={ user ? '/home' : '/'}>Home</NavLink></li>
            </ul>
        </div>
    )
}

export default Navbar