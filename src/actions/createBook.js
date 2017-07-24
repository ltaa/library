import fetch from 'isomorphic-fetch'
// import {receiveBooks, fetchBooks} from './getBooks'
import {getSessionHeader} from './authAction'
import {datasource} from '../application'
import {fetchBooks} from './getBooks'

export function createBook(jsonBody) {

  if (jsonBody == null)
    return

  const headers = getSessionHeader();
  let requestString = datasource + "/api/books"
    const request = new Request(requestString, {
      method: 'POST',
      headers: headers,
      body: jsonBody
    });

  return dispatch => {

      return fetch(request)
        .then((result) => {
        console.log("result: ", result)
      }).then(res => {

        dispatch(fetchBooks())

      })
  }
}

//
//
// export function receiveCardBooks(json) {
//
//   console.log(json)
//   return {type: RECEIVE_CARD_BOOKS, books: json}
// }
