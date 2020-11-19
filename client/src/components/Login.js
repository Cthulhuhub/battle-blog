import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'
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

    const demoLogin = async (e) => {
        e.preventDefault()
        const res = await checker('fakeuser1', 'fakepassword1')
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
            <div className='form-container'>
                <form action='/login' method='post' onSubmit={handleSubmit} className='forms login-form'>
                    <h1>Login</h1>
                    <div className='form-box'>
                        <label htmlFor='username'>Username </label>
                        <input type='text' value={username} name='username' onChange={updateUsername}></input>
                    </div>
                    <div className='form-box'>
                        <label htmlFor='password'>Password </label>
                        <input type='password' value={password} name='password' onChange={updatePassword}></input>
                    </div>
                    <div className="login-button-wrapper">
                        <button type='submit'>Log in</button>
                        <button id="demo-user-button" onClick={demoLogin}>Demo User</button>
                    </div>
                </form>
                <small id="sign-up-link">Don't have an account? <NavLink to='/signup'>Sign up</NavLink></small>
            </div>
        </>
    )
}

export default Login