import {datasource} from '../application'
import {RECEIVE_BOOKS,AUTHENTICATE_ERROR} from '../constants/constants'
import {getSessionHeader} from './authAction'

export function fetchBooks(param) {

  let requestString = ""
  if (param == null) {
    requestString = datasource + "/api/books"
  } else {
    requestString = datasource + "/api/books?query=" + param
  }

const headers = getSessionHeader();

  const request = new Request(requestString, {
    method: 'GET',
    headers: headers
  });

  return dispatch => {
    return fetch(request)
      .then(response => {
        return response.json().then(data => {
          return {
            data: data,
            status: response.status
          }
        })
      })
      .then(json => {

        if (json.status === 200) {
          dispatch(receiveBooks(json.data))
        } else if (json.status === 401) {
          dispatch(authError(json))
        }
      })

  }
}

export function receiveBooks(json) {
  return {
    type: RECEIVE_BOOKS,
    books: json

  }
}

export function authError(json) {
  return {
    type: AUTHENTICATE_ERROR,
    auth: false
  }
}
