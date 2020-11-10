import { unsetAllChars } from './chars'

const DEAUTHORIZE = 'DEAUTHORIZE'
const SET_USER = 'SET_USER'
const SET_TOKEN = 'SET_TOKEN'


export const setUser = user => ({
    type: SET_USER,
    user
})

export const setToken = token => ({
    type: SET_TOKEN,
    token
})

export const removeAuth = () => ({ type: DEAUTHORIZE })

export const loadUser = () => async dispatch => {
    const user = JSON.parse(window.localStorage.getItem('USER'))
    const token = window.localStorage.getItem('TOKEN')

    if (!user || !token) return;

    const res = await fetch('/verify_token', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
    })

    if (res.ok) {
        dispatch(setUser(user))
        dispatch(setToken(token))
    } else {
        window.localStorage.removeItem('TOKEN');
        window.localStorage.removeItem('USER');
        dispatch(removeAuth())
    }
}

export const login = (username, password) => async dispatch => {
    const res = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })

    if (res.ok) {
        const { user, token } = await res.json();
        window.localStorage.setItem('TOKEN', token)
        window.localStorage.setItem('USER', JSON.stringify(user))
        dispatch(setToken(token))
        dispatch(setUser(user))
        return { status: 200 }
    } else {
        return { status: 400 }
    }
}

export const logout = () => async (dispatch, getState) => {
    const { auth: { token } } = getState()

    const res = await fetch('/logout', {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
    })

    if (res.ok) {
        window.localStorage.removeItem('TOKEN');
        window.localStorage.removeItem('USER');
        dispatch(removeAuth())
        dispatch(unsetAllChars())
    } else {
        return { states: 400 }
    }
}

export const signup = (username, email, password) => async dispatch => {
    const res = await fetch('/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    })

    if (res.ok) {
        const { user, token } = await res.json();
        window.localStorage.setItem('TOKEN', token)
        window.localStorage.setItem('USER', JSON.stringify(user))
        dispatch(setToken(token))
        dispatch(setUser(user))
        return { status: 200 }
    }
}

export default function authReducer(state = {}, action) {

    switch (action.type) {
      case SET_USER:
        return { ...state, user: action.user };
      case SET_TOKEN:
        return { ...state, token: action.token };
      case DEAUTHORIZE:
        return {};
      default:
        return state;
    }
  }