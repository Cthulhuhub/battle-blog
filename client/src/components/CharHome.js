import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Post from './Post'
import '../style/feed.css'

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

    if (posts[posts.length - 1].count) {
        posts.pop()
    }

    return (
        <>
            <div className='posts-container'>
                <div className='char-snippet'>
                    <h2>{activeChar.name}</h2>
                    <h4>{activeChar.class_name}</h4>
                    <div className='page-controls'>
                        <button value='1' onClick={changePage}>{'<<'}</button>
                        <button value={page} onClick={changePage}>{'<'}</button>
                        <button value='page-count' onClick={changePage}>{page + 1}</button>
                        <button value={page + 1} onClick={changePage}>{'>'}</button>
                    </div>
                </div>
                <div className='inner-posts-container'>
                    {posts.map(post => (
                        <Post post={post} key={post.id} />
                    ))}
                </div>
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