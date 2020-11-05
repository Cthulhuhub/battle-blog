import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { activateChar } from '../store/chars'

function CharacterCard({ char }) {

    const dispatch = useDispatch()
    const history = useHistory()

    function setActiveChar() {
        dispatch(activateChar(char))
        history.push('/home')
    }

    return (
        <div className="character-card" onClick={setActiveChar}>
            <h2>{char.name}</h2>
            <h3>{char.class_name}</h3>
            <p>{char.bio}</p>
        </div>
    )
}

export default CharacterCard