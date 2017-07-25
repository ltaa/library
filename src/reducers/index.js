import initialState from '../store/initialState'

import {
  RECEIVE_BOOKS,
  LOG_IN_SUCCESS,
  AUTHENTICATE_ERROR,
  RECEIVE_CARD_BOOKS,
  RECEIVE_CLIENT_BOOKS,
  LOG_OUT_SUCCESS,
  RECEIVE_CLIENT,
  CHANGE_LOCATION
} from '../constants/constants'


export default function rootReducer(state = initialState, action) {
  console.log("state: ", state)
  console.log("action: ", action)

  switch (action.type) {

    case CHANGE_LOCATION:
    return Object.assign({}, state, {
      books: action.books
    })
    case RECEIVE_CLIENT:
    return Object.assign({}, state, {
      clients: action.clients,
    })

    case LOG_OUT_SUCCESS:
    sessionStorage.removeItem("jwt")
    return Object.assign({}, state, {
      auth: false,
    })

    case RECEIVE_CARD_BOOKS:
      return Object.assign({}, state, {
        books: action.books,
      })

    case RECEIVE_CLIENT_BOOKS:
      return Object.assign({}, state, {
        books: action.books,
      })

    case AUTHENTICATE_ERROR:
      sessionStorage.removeItem("jwt")
      return Object.assign({}, state, {
        auth: action.auth,
      })
    case LOG_IN_SUCCESS:
      return Object.assign({}, state, {
        workerId: action.workerId,
        auth: !!sessionStorage.getItem("jwt"),
      })
    case RECEIVE_BOOKS:
      return Object.assign({}, state, {
        books: action.books,
      })
    default:
      return state
  }
}
