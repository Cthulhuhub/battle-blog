import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'

function ProfilePage() {
    const token = useSelector(state => state.auth.token)
    const { id } = useParams()

    const [char, setChar] = useState('')
    const [posts, setPosts] = useState('')

    useEffect(() => {
        async function getCharAndPosts() {
            const charRes = await fetch(`/api/chars/details/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })

            const postsRes = await fetch(`/api/posts/character/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })

            if (charRes.ok && postsRes.ok) {
                const selectedChar = await charRes.json()
                const charPosts = await postsRes.json()
                setChar(selectedChar)
                setPosts(charPosts)
            }
        }

        getCharAndPosts()
    }, [id, token])

    return (
        <>
            <div className="profile-container">
                <h1>{char.name}</h1>
                    <h3>{char.class_name}</h3>
                <p>{char.bio}</p>
            </div>
            <div className="char-posts-container">
                <h2>Posts</h2>
                {posts ? posts.map(post => (
                    <div key={post.id}>
                        <h3><NavLink to={`/posts/${id}`}>{post.title}</NavLink></h3>
                        <p>{post.content}</p>
                        <p><small>{post.created_at.substring(0, 12)}</small></p>
                    </div>
                ))
                :
                    <>
                        <h2>This character hasn't posted yet</h2>
                    </>
                }
            </div>
        </>
    )
}

export default ProfilePage