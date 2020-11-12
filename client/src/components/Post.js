import React from 'react';
import { NavLink } from 'react-router-dom';

function Post({ post }) {
    return (
        <div className='post-container'>
            <div className="content-container">
                <h2><NavLink to={`/posts/${post.id}`}>{post.title}</NavLink></h2>
                <p>{post.content}</p>
            </div>
            <p className="post-info"><small><NavLink to={`/chars/${post.author.id}`}>{post.author.name}</NavLink> - {post.created_at.substring(0, 12)}</small></p>
        </div>
    )
}

export default Post