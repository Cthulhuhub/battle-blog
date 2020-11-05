const SET_CHAR = 'SET_CHAR'
const SET_ALL_CHARS = 'SET_ALL_CHARS'
const UNSET_ALL_CHARS = 'UNSET_ALL_CHARS'

const setChar = char => ({
    type: SET_CHAR,
    char
})

const setAllChars = chars => ({
    type: SET_ALL_CHARS,
    chars
})

export const unsetAllChars = () => ({ type: UNSET_ALL_CHARS })

export const loadChars = (userId) => async (dispatch, getState) => {
    let { auth: { token } } = getState()
    if (!token) {
        token = window.localStorage.getItem('TOKEN')
        if (!token) {
            return;
        }
    }

    if (userId) {
        const res = await fetch(`/api/chars/${userId}`, {
            headers: { Authorization: `Bearer ${token}`}
        })
        if (res.ok) {
            const chars = await res.json()
            dispatch(setAllChars(chars))
        }
    }
}

export const activateChar = (char) => async dispatch => {
    dispatch(setChar(char))
}

export default function charsReducer(state = {}, action) {
    switch(action.type) {
        case SET_ALL_CHARS:
            return { ...state, user_chars: action.chars }
        case SET_CHAR:
            return { ...state, current_char: action.char }
        case UNSET_ALL_CHARS:
            return {}
        default:
            return { ...state }
    }
}