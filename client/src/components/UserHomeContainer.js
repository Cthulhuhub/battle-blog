import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { loadChars } from '../store/chars'
import UserHome from './UserHome'

function UserHomeContainer() {
    let user = useSelector(state => state.auth.user)
    const chars = useSelector(state => state.chars.user_chars)

    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadChars(user.id))
    }, [])

    if (!user) {
        user = JSON.parse(window.localStorage.getItem('USER'))
        console.log(user)
        if (!user) {
            history.push('/login')
        }
    }


    if (!user || !chars) {
        return <></>
    }


    console.log(chars)

    return (
        <UserHome chars={chars.characters} user={user} />
    )
}

export default UserHomeContainer