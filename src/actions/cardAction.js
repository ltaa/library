import fetch from 'isomorphic-fetch'
import {fetchBooks} from './getBooks'
import {getSessionHeader, authError} from './authAction'
import {datasource} from '../application'
import {RECEIVE_CARD_BOOKS} from '../constants/constants'

export function addToCard(id, param) {

  if (param == null || id == null)
    return

  const headers = getSessionHeader();
  let requestString = datasource + "/api/card/" + id
    const request = new Request(requestString, {
      method: 'POST',
      headers: headers,
      body: param
    });

  return dispatch => {
      return fetch(request)
        .then((result) => {

      }).then(res => {
        dispatch(fetchBooks())

      })
  }
}

export function getCardList(id) {
  const headers = getSessionHeader();
  let requestString = datasource + "/api/card/" + id
  const request = new Request(requestString, {
      method: 'GET',
      headers: headers,
    });


  return dispatch => {
    fetch(request)
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
        dispatch(receiveCardBooks(json.data))
      } else if (json.status === 401) {
        dispatch(authError(json))
      }
    })
  }
}

export function checkout(workerId, clientId, param) {

  if (param == null || clientId == null || workerId == null) {
    return
  }

  const headers = getSessionHeader();
  let requestString = datasource + "/api/card/" + workerId + "/" + clientId
    const request = new Request(requestString, {
      method: 'POST',
      headers: headers,
      body: param
    });

  return dispatch => {
    return fetch(request)
      .then(result => {
        dispatch(getCardList(workerId))
    })
  }
}

export function receiveCardBooks(json) {
  return {type: RECEIVE_CARD_BOOKS, books: json}
}
