import React from 'react'

function UserHome({ user, chars }) {
    console.log(chars)
    return (
        <>
            <h1>Welcome {user ? user.username : ''}</h1>
            <div className='chars-list-container'>
                <ul className='chars-list'>
                    {chars.map(char => <li className="chars-list__char" key={char.id}>{char.name}</li>)}
                </ul>
            </div>
        </>
    )
}

export default UserHome