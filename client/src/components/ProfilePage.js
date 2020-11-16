import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import '../style/profile.css'

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
        <div className="posts-container">
            <div className="profile-container">
                <div className="profile-wrapper">
                    <h1>{char.name}</h1>
                    <div className="posts-title">
                        <h3>{char.class_name}</h3>
                    </div>
                    <h3>Posts</h3>
                    <div className="char-posts-list">
                        {posts ? posts.map(post => (
                            <div key={post.id} className="char-post-wrapper">
                                <h4><NavLink to={`/posts/${id}`}>{post.title}</NavLink></h4>
                                <p><small>{post.created_at.substring(0, 12)}</small></p>
                            </div>
                        ))
                        :
                            <>
                                <h2>This character hasn't posted yet</h2>
                            </>
                        }
                    </div>
                </div>
            </div>
            <div className="char-bio-container inner-posts-container">
                <div className="bio-wrapper">
                    <h2>Bio</h2>
                    <p>{char.bio}</p>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage