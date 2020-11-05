import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { login } from '../store/auth'

function Login() {
    const user = useSelector(state => state.auth.user)

    const history = useHistory()

    if (user) {
        history.push('/character-select')
    }

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch();
    const loginDispatcher = (username, password) => dispatch(login(username, password))

    async function checker(username, password) {
        const res = await loginDispatcher(username, password)
        return res.status
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await checker(username, password)
        if (res === 200) {
            history.push('/character-select')
        }
    }

    const updateUsername = (e) => {
        setUsername(e.target.value)
    }

    const updatePassword = (e) => {
        setPassword(e.target.value)
    }

    return (
        <>
            <h1>Login</h1>
            <div className='form_container'>
                <form action='/login' method='post' onSubmit={handleSubmit}>
                    <div>
                        <label for='username'>Username: </label>
                        <input type='text' value={username} name='username' onChange={updateUsername}></input>
                    </div>
                    <div>
                        <label for='password'>Password: </label>
                        <input type='password' value={password} name='password' onChange={updatePassword}></input>
                    </div>
                    <button type='submit'>Log in</button>
                </form>
            </div>
        </>
    )
}

export default Login