import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createChar } from '../store/chars'

function CreateCharacter() {
    const user = useSelector(state => state.auth.user)
    const history = useHistory()
    const dispatch = useDispatch()

    if (!user) {
        history.push('/login')
    }

    const [name, setName] = useState('')
    const [bio, setBio] = useState('')
    const [class_name, setClass_name] = useState('')

    function handleChange(e) {
        switch (e.target.id) {
            case 'name':
                setName(e.target.value)
                break;
            case 'class_name':
                setClass_name(e.target.value)
                break;
            case 'bio':
                setBio(e.target.value)
                break;
            default:
                break
        }
    }


    function handleSubmit(e) {
        e.preventDefault();
        dispatch(createChar({ user_id: user.id, name, bio, class_name }))
        history.push('/home')
    }

    return (
        <>
            <h1>Create a new Character!</h1>
            <div className='char-form-container'>
                <form method='post' action='/create' onSubmit={handleSubmit}>
                    <div className='form-box'>
                        <label htmlFor='name'>Name: </label>
                        <input id='name' type='text' value={name} onChange={handleChange}></input>
                    </div>
                    <div className='form-box'>
                        <label htmlFor='class_name'>Class: </label>
                        <input id='class_name' type='text' value={class_name} onChange={handleChange}></input>
                    </div>
                    <div className='form-box'>
                        <label htmlFor='bio'>Bio: </label>
                        <textarea id='bio' name='bio' value={bio} onChange={handleChange}></textarea>
                    </div>
                    <button type='submit'>Create</button>
                </form>
            </div>
        </>
    )
}

export default CreateCharacter