import {CHANGE_LOCATION} from '../constants/constants'

export function cleanBooks() {
  return {type: CHANGE_LOCATION, books: []}
}
