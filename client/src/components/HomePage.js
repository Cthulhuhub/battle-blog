import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

function HomePage() {
    const user = useSelector(state => state.auth.user)

    const history = useHistory()

    if (user) {
        history.push('/home')
    }
    return (
        <h1>Welcome</h1>
    )
}

export default HomePage