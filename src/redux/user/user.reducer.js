//! reducer  is just a function that gets two properties
//!     - a state object which is just an object that represents what it is that we're trying to store
//!     - an action that is just an object that has a type which is a string value, and has a payload that can be something to update the state

import { UserActionTypes } from "./user.types";

const INITIAL_STATE = {
  currentUser: null
};

//                  state = INITIAL_STATE -> default parameter value
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      };

    default:
      return state;
  }
};

export default userReducer;
