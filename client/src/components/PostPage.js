import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom'

function PostPage() {
    const token = useSelector(state => state.auth.token)
    const history = useHistory()
    let { id } = useParams();

    const [post, setPost] = useState('')

    useEffect(() => {
        async function getPost() {
            const res = await fetch(`/api/posts/${id}`, {
                headers: { Authorization: `Bearer ${token}`}
            })

            if (res.ok) {
                const currPost = await res.json()
                setPost(currPost)
            } else {
                history.push('/404')
            }
        }

        getPost()
    }, [history, id, token])

    if (!post) return <></>

    return (
        <div className='post-page-container'>
            <div className='author-blurb'>
                <h2><NavLink to={`/chars/${post.author.id}`}>{post.author.name}</NavLink></h2>
                <p>{post.author.bio.substring(0, 50)}</p>
            </div>
            <div className='post-zone'>
                <h1>{post.title}</h1>
                <p><small>{post.created_at.substring(0, 12)}</small></p>
                <p>{post.content}</p>
            </div>
        </div>
    )
}

export default PostPage