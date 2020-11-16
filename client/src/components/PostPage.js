import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom'
import '../style/post.css'

function PostPage() {
    const token = useSelector(state => state.auth.token)
    const history = useHistory()
    let { id } = useParams();

    const [post, setPost] = useState('')
    const [similarPosts, setSimilarPosts] = useState('')

    useEffect(() => {
        async function getPost() {
            const postRes = await fetch(`/api/posts/${id}`, {
                headers: { Authorization: `Bearer ${token}`}
            })

            const similarRes = await fetch(`/api/posts/related/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })

            if (postRes.ok && similarRes.ok) {
                const currPost = await postRes.json()
                const similar = await similarRes.json()
                setPost(currPost)
                setSimilarPosts(similar)
            } else if (postRes.ok) {
                const currPost = await postRes.json()
                setPost(currPost)
            } else {
                history.push('/404')
            }
        }

        getPost()
    }, [history, id, token])

    if (!post) return <></>

    return (
        <div className='post-page-container posts-container'>
            <div className='author-and-similar'>
                <div className='author-blurb char-snippet'>
                    <h2><NavLink to={`/chars/${post.author.id}`}>{post.author.name}</NavLink></h2>
                    <span>{post.author.bio.substring(0, 50)}</span>
                    { similarPosts
                        ? <div className='similar-posts'>
                            <h3>Similar Posts</h3>
                            <ul>
                                {similarPosts.map(post => <li key={post.id}>
                                    <NavLink to={`/posts/${post.id}`}>{post.title}</NavLink>
                                </li>)}
                            </ul>
                        </div>
                        : <></>
                    }
                </div>
            </div>
            <div className='post-zone inner-posts-container'>
                <div className="post-wrapper">
                    <div className="content-wrapper">
                        <h1>{post.title}</h1>
                        <p><small>{post.created_at.substring(0, 12)}</small></p>
                        <p>{post.content}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostPage