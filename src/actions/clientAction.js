import fetch from "isomorphic-fetch"
import {getSessionHeader, authError} from './authAction';
import {datasource} from '../application'
import {
  RECEIVE_CLIENT_BOOKS,
  RECEIVE_CLIENT
} from '../constants/constants'


export function getBooksList(id) {
  if (id == null)
    return
  const requestString = datasource + "/api/clients/" + id
  const headers = getSessionHeader();
  const request = new Request(requestString, {
    method: 'GET',
    headers: headers
  });

  return dispatch => {
    return fetch(request).then(response => {

      return response.json().then(data => {

        return {
          data: data,
          status: response.status
        }
      })
    })
    .then(json => {


      if (json.status === 200) {
        dispatch(receiveClientBooks(json.data))
      } else if (json.status === 401) {
        dispatch(authError(json))
      }
    })
  }
}

export function returnBook(param, id) {
  console.log("enter returnBook ", param, id)
  if (param == null || id === -1 || id == null) {
    return
  }
  return dispatch => {

    let requestString = datasource + "/api/clients/" + id

    console.log("requestString ", requestString)
    const headers = getSessionHeader();
    const request = new Request(requestString, {
      method: 'POST',
      headers: headers,
      body: param
    });
      return fetch(request)
      .then(response => {

        console.log("response: ", response)
        dispatch(getBooksList(id))
      })
}
}

  export function receiveClientBooks(json) {
    return {type: RECEIVE_CLIENT_BOOKS, books: json}
  }


  export function receiveClients(json) {
    return {type: RECEIVE_CLIENT, clients: json}
  }


export function fetchClients(query) {
  let requestString = ""

  if (query == null)
    requestString = datasource + "/api/clients"
  else if (!isNaN(parseInt(query, 10))) {
    requestString = datasource + "/api/clients?id=" + query
  }
  else {
    requestString = datasource + "/api/clients?name=" + query
  }
  const headers = getSessionHeader();
  const request = new Request(requestString, {
    method: 'GET',
    headers: headers
  });

  return dispatch => {
    return fetch(request).then(response => {

      return response.json().then(data => {

        return {
          data: data,
          status: response.status
        }
      })
    })
    .then(json => {
      console.log("recieve data:", json)

      if (json.status === 200) {
        dispatch(receiveClients(json.data))
      } else if (json.status === 401) {
        dispatch(authError(json))
      }
    })
  }
}




export function registerClient(param) {
  console.log("enter registerClient ", param)
  if (param == null) {
    return
  }
  
  return dispatch => {

    let requestString = datasource + "/api/clients"

    console.log("requestString ", requestString)
    const headers = getSessionHeader();
    const request = new Request(requestString, {
      method: 'POST',
      headers: headers,
      body: param
    });
      return fetch(request)
      .then(response => {

        console.log("response: ", response)
        // dispatch(getBooksList(id))
      })
}
}
