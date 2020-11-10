import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { loadUser } from '../store/auth'
import { loadChars } from '../store/chars'
import '../style/navbar.css'
import logo from '../style/bblogo.png'

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
            <div>
                <NavLink to='/'><img className='logo' src={logo} alt="Battle Blog logo"></img></NavLink>
            </div>
            { user ? <div><NavLink activeClassName='active-nav' to='/character-select'>Character Select</NavLink></div> : <></> }
            { activeChar ?
                <>
                    <div className="feed-link">
                        <NavLink activeClassName='active-nav' to='/home'>
                            Feed
                        </NavLink>
                    </div>
                    <div className='new-post-link'>
                        <NavLink to='/new-post' activeClassName='active-nav'>New Post</NavLink>
                    </div>
                </>
                : <></> }
            <div className="login"><NavLink activeClassName='active-nav' to={ user ? '/logout' : '/login'}>{ user ? 'Logout' : 'Login'}</NavLink></div>
        </div>
    )
}

export default Navbar