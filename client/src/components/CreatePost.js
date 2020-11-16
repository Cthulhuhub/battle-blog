import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

function CreatePost() {
    const { user, token } = useSelector(state => state.auth)
    const char = useSelector(state => state.chars.current_char)
    const history = useHistory()

    if (!user) {
        history.push('/login')
    } else if (!char) {
        history.push('/character-select')
    }

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [ok, setOk] = useState(true)

    function handleChange(e) {
        switch(e.target.id) {
            case 'title':
                setTitle(e.target.value)
                break;
            case 'content':
                setContent(e.target.value)
                break;
            default:
                break;
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const res = await fetch('/api/posts/create', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ character_id: char.id, title, content })
        })

        if (res.ok) {
            setTitle('')
            setContent('')
            history.push(`/chars/${char.id}`)
        } else {
            setOk(false)
        }
    }

    return (
        <div className='create-post-container form-container'>
            <form method='post' action='/create-post' onSubmit={handleSubmit}>
                <h1>New Post</h1>
                { ok ? <></> : <h3>Something went wrong, please try again.</h3>}
                <div className='form-box'>
                    <label for='title'>Title</label>
                    <input type='text' name='title' id='title' value={title} onChange={handleChange}></input>
                </div>
                <div className='form-box'>
                    <label for='content'>Content</label>
                    <textarea name='content' id='content' value={content} onChange={handleChange}></textarea>
                </div>
                <button type='submit'>Post</button>
            </form>
        </div>
    )
}

export default CreatePost;