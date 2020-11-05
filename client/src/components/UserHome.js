import React from 'react'
import CharacterCard from './CharacterCard'

function UserHome({ chars }) {
    return (
        <>
            <h1>Select a character</h1>
            <div className='chars-list-container'>
                {chars.map(char => <CharacterCard char={char} key={char.id}/>)}
            </div>
        </>
    )
}

export default UserHome