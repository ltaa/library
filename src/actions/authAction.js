import fetch from 'isomorphic-fetch'
import {datasource} from '../application'


import {
  LOG_IN_SUCCESS,
  AUTHENTICATE_ERROR,
  LOG_OUT_SUCCESS
} from '../constants/constants'


export function getSessionHeader() {
  return {"Authorization": "Bearer " + sessionStorage.getItem("jwt")}
}

export function loginSuccess(workerId) {
  return {
    type: LOG_IN_SUCCESS,
    workerId: workerId
  }
}

export function logoutSuccess() {
  return {type: LOG_OUT_SUCCESS}
}

export function getToken(param) {

  return dispatch => {
    if (param != null) {
      return fetch(datasource +"/api/auth", {
        method: "POST",
        body: JSON.stringify(param)

      }).then((response) => {
        return response.json().then(data => {
          return {
            data: data,
            status: response.status
          }
        })
      })
      .then(json => {
        console.log("STATUS", json)

        if (json.status === 200) {
          sessionStorage.setItem("jwt", json.data.jwt)
          dispatch(loginSuccess(json.data.worker_id))
        } else {
          dispatch(authError(json))
        }
        // sessionStorage.setItem("jwt", json.jwt)
        // dispatch(loginSuccess())

      })

    }

  }
}

export function logout() {

  return logoutSuccess()
}



export function authError(json) {
  return {
    type: AUTHENTICATE_ERROR,
    auth: false
  }
}
