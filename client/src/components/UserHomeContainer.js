import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { loadChars } from '../store/chars'
import UserHome from './UserHome'

function UserHomeContainer() {
    let user = useSelector(state => state.auth.user)

        const history = useHistory()
        const dispatch = useDispatch()

        if (!user) {
            user = JSON.parse(window.localStorage.getItem('USER'))
            console.log(user)
            if (!user) {
                history.push('/login')
            }
        }

        useEffect(() => {
            dispatch(loadChars(user.id))
        }, [])

        const chars = useSelector(state => state.chars.user_chars)

        return (
            <UserHome chars={chars.characters} user={user} />
        )
}

export default UserHomeContainer