
import { USER_LOGGEDIN, USER_LOGGEDOUT, SET_USER_NAME, USER_DATA } from "./usersAction"

const token = window.localStorage.getItem("loginKey")
const initialState = {
  isLoggedIn: false,
  token
}

console.log(initialState);

export const userReducer = (state = initialState, action) => {
  switch (action.type) {

    case USER_DATA:
      return {
        ...state,
        ...action.payload,
      }
    case SET_USER_NAME:
      return {
        ...state,
        name: action.payload,
      }
    case USER_LOGGEDIN:
      return {
        ...state,
        _id: action.payload,
        isLoggedIn: true,
      }
    case USER_LOGGEDOUT:
      return {
        isLoggedIn: false,
        token: null,
        permissions: [],
      }
    default:
      return state

  }
}