import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import  { signup } from '../store/auth'

function SignUp() {
    const user = useSelector(state => state.auth.user)

    const [username, setUsername] = useState('testsignup')
    const [email, setEmail] = useState('fake@email.com')
    const [password, setPassword] = useState('password1')
    const [confirmedPassword, setConfirmedPassowrd] = useState('password1')

    const history = useHistory()
    const dispatch = useDispatch()

    if (user) {
        history.push('/character-select')
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(signup(username, email, password))
    }

    function handleChange(e) {
        switch (e.target.id) {
            case 'username':
                setUsername(e.target.value)
                break;
            case 'email':
                setEmail(e.target.value)
                break;
            case 'password':
                setPassword(e.target.value)
                break;
            case 'confirm-password':
                setConfirmedPassowrd(e.target.value)
                break
            default:
                break
        }
    }

    return (
        <div className='form-container'>
            <form action='/signup' method='post' onSubmit={handleSubmit}>
                <div className='form-box username-box'>
                    <label htmlFor='username'>Username: </label>
                    <input type='text' id='username' value={username} onChange={handleChange}></input>
                </div>
                <div className='form-box email-box'>
                    <label htmlFor='email'>Email: </label>
                    <input type='email' id='email' value={email} onChange={handleChange}></input>
                </div>
                <div className='form-box password-box'>
                    <label htmlFor='password'>Password: </label>
                    <input type='password' id='password' value={password} onChange={handleChange}></input>
                </div>
                <div className='form-box confirm-password-box'>
                    <label htmlFor='confirm-password'>Confirm password: </label>
                    <input type='password' id='confirm-password' value={confirmedPassword} onChange={handleChange}></input>
                </div>
                <button type='submit'>Sign up</button>
            </form>
        </div>
    )

}

export default SignUp