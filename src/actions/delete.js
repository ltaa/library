import fetch from 'isomorphic-fetch'
import {getSessionHeader, authError} from './authAction'
import {datasource} from '../application'
import {receiveBooks, fetchBooks} from './getBooks'

export function deleteBook(jsonBody) {

  console.log("enter deleteBook")
  if (jsonBody == null)
    return

  const headers = getSessionHeader();
  let requestString = datasource + "/api/books"
    const request = new Request(requestString, {
      method: 'DELETE',
      headers: headers,
      body: jsonBody
    });

  return dispatch => {
      return fetch(request)
        .then((result) => {
      }).then(res => {
        dispatch(fetchBooks())
      })
  }
}
