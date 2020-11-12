import React from 'react'
import '../style/homepage.css'

function HomePage() {

    return (
        <div className='home-page-container'>
            <div className='img-container'>
                <div className='gif-box'>
                    <div className='logo-box'></div>
                    <div className='home-title'>
                        <h1>Welcome to Battle Blog</h1>
                    </div>
                </div>
            </div>
            <div className='text-areas'>
                <h2>The place to tell all your favorite character's stories</h2>
                <p>
                    Here, you can have multiple characters on one account, all of which are completely separate from
                    one another.
                </p>
            </div>
        </div>
    )
}

export default HomePage