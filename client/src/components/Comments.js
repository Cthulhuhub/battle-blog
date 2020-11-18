import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

function Comments({ token, id }) {
    const activeChar = useSelector(state => state.chars.current_char)

    const [content, setContent] = useState('')
    const [comments, setComments] = useState([])

    useEffect(() => {
        async function getComments() {
            const res = await fetch(`/api/posts/${id}/comments`, {
                headers: { Authorization: `Bearer ${token}` }
            })

            if (res.ok) {
                let parsedComs = await res.json()
                setComments([...parsedComs])
            }
        }
        getComments()
    }, [id, token])

    async function handleSubmit(e) {
        e.preventDefault();

        const res = await fetch('/api/posts/comment', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                character_id: activeChar.id,
                post_id: id,
                content: content
            })
        })

        if (res.ok) {
            let newComment = await res.json()
            setComments([newComment, ...comments])
        }
    }

    function handleChange(e) {
        setContent(e.target.value)
    }

    if (!activeChar) {
        return <></>
    }


    return (
        <>
            <div className="comments-container">
                <h2>Comments</h2>
                {comments
                    ? comments.map(comment => {
                        return (
                            <div className="comment-box" key={comment.id}>
                                <span className="comment-content">{comment.content}</span>
                                <span  className="comment-details">
                                    <small>
                                        <NavLink to={`/chars/${comment.author.id}`}>{comment.author.name}</NavLink> - {comment.created_at.substring(0, 12)}
                                    </small>
                                </span>
                            </div>
                        )
                    })
                    : <></>
                }
                <div className="comment-form-container form-container" id="new-comment-form">
                    <form action="/comment" method="post" onSubmit={handleSubmit}>
                        <h3>New Comment</h3>
                        <div className="form-box">
                            <textarea id="comment-content" value={content} onChange={handleChange}></textarea>
                        </div>
                        <button type="submit">Comment</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Comments