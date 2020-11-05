import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'


function CharacterFeed() {
    const { user, token } = useSelector(state => state.auth)
    const activeChar = useSelector(state => state.chars.current_char)
    const history = useHistory()
    const [page, setPage] = useState(0)
    const [posts, setPosts] = useState('')

    if (!user) {
        history.push('/login')
    } else if (!activeChar) {
        history.push('/character-select')
    }

    function changePage(e) {
        let pageNum = parseInt(e.target.value)
        if (pageNum) {
            if (posts.length === 10 && pageNum > page) {
                setPage(pageNum)
            } else if (posts.length < 10 && pageNum <= page) {
                setPage(pageNum - 1)
            }
        }
    }

    useEffect(() => {
        async function getData() {
            const newPosts = await getPosts(page, token)
            setPosts(newPosts)
        }

        getData()
    }, [page, token])

    if (!posts) {
        return <></>
    }

    let postsCount

    if (posts[posts.length - 1].count) {
        postsCount = posts.pop().count
    }
    console.log(typeof postsCount)
    return (
        <>
            <div className='posts-container'>
                {posts.map(post => (
                    <div className='post-box' key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                    <p><small>{post.author.name} - {post.created_at.substring(0, 12)}</small></p>
                    </div>
                ))}
            </div>
            <div className='page-controls'>
                <button value='1' onClick={changePage}>{'<<'}</button>
                <button value={page} onClick={changePage}>{'<'}</button>
                <button value='page-count' onClick={changePage}>{page + 1}</button>
                <button value={page + 1} onClick={changePage}>{'>'}</button>
                <button value={Math.ceil(postsCount / 10)} onClick={changePage}>{'>>'}</button>
            </div>
        </>
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