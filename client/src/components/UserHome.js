import React from 'react'
import { useHistory } from 'react-router-dom'
import CharacterCard from './CharacterCard'

function UserHome({ chars }) {
    const history = useHistory()
    return (
        <div className='selector-wrap'>
            <h1>Select a character</h1>
            <div className='chars-list-container'>
                {chars.map(char => <CharacterCard char={char} key={char.id}/>)}
            </div>
            <button id='char-create-button' onClick={() => history.push('/create')}>Create new character</button>
        </div>
    )
}

export default UserHome