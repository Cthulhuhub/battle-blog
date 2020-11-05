import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { loadUser } from '../store/auth'
import { loadChars } from '../store/chars'

function Navbar() {
    const user = useSelector(state => state.auth.user)
    const activeChar = useSelector(state => state.chars.current_char)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!user) {
            dispatch(loadUser())
        } else {
            dispatch(loadChars())
        }
    }, [dispatch, user])

    return (
        <div className='navbar'>
            <ul>
                <li><NavLink to={ user ? '/logout' : '/login'}>{ user ? 'Logout' : 'Login'}</NavLink></li>
                <li><NavLink to={ user ? '/character-select' : '/' }>
                    Character Select
                </NavLink></li>
                { activeChar ? <li><NavLink to='/home'>Feed</NavLink></li> : <></> }
            </ul>
        </div>
    )
}

export default Navbar