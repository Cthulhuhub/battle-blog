import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'


function CharacterFeed() {
    const token = useSelector(state => state.auth.token)

    const [posts, setPosts] = useState('')
    const [page, setPage] = useState(0)

    useEffect(() => {
        async function getData() {
            const newPosts = await getPosts(page, token)
            setPosts(newPosts)
        }

        getData()
    }, [page])

    return (
        <div className='posts-container'>
            {posts.map(post => (
                <div className='post-box'>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    <p><small>{post.created_at.substring(0, 12)}</small></p>
                </div>
            ))}
        </div>
    )
}

async function getPosts(page, token) {
    if (!token) {
        token = window.localStorage.getItem('TOKEN')
    }

    const res = await fetch(`/api/posts/newest-posts/${page}`, {
        headers: { Authorization: `Bearer ${token}` }
    })

    if (res.ok) {
        const posts = await res.json()
        return posts
    }
}

export default CharacterFeed