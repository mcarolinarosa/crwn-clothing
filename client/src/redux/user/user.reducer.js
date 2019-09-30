//! reducer  is just a function that gets two properties
//!     - a state object which is just an object that represents what we're trying to store
//!     - an action that is just an object that has   a string value, and has a payload that can be something to update the state

import UserActionTypes from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  error: null
};

//                  state = INITIAL_STATE -> default parameter value
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SIGNIN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null
      };
    case UserActionTypes.SIGNOUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        error: null
      };

    case UserActionTypes.SIGNIN_FAILURE:
    case UserActionTypes.SIGNUP_FAILURE:
    case UserActionTypes.SIGNOUT_FAILURE:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
};

export default userReducer;
