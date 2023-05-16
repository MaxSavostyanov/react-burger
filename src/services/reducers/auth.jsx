import {
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILED,
} from '../actions/auth';

const initialState = {
  userData: null,

  registrationRequest: false,
  registrationFailed: false,

};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {

    case REGISTRATION_REQUEST: {
      return {
        ...state,
        registrationRequest: true,
      };
    }
    case REGISTRATION_SUCCESS: {
      return {
        ...state,
        registrationRequest: false,
        registrationFailed: false,
        userData: action.user,
      };
    }
    case REGISTRATION_FAILED: {
      return {
        ...state,
        registrationRequest: false,
        registrationFailed: true,
      };
    }

    default: {
      return state;
    }
  }
};