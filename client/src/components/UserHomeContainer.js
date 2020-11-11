import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { loadChars } from '../store/chars'
import UserHome from './UserHome'
import '../style/charselect.css'

function UserHomeContainer() {
    let user = useSelector(state => state.auth.user)
    const chars = useSelector(state => state.chars.user_chars)
    const history = useHistory()

    if (!user) {
        user = JSON.parse(window.localStorage.getItem('USER'))
        if (!user) {
            history.push('/login')
        }
    }


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadChars(user.id))
    }, [dispatch, user.id])



    if (!user || !chars) {
        return <></>
    }

    return (
        <>
            <UserHome chars={chars.characters} />
        </>
    )
}

export default UserHomeContainer