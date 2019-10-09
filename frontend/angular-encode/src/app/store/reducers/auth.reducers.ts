import { User } from './../../models/user';
import { AuthActionTypes, All } from '../actions/auth.actions';


export interface State {
  // is a user authenticated?
  isAuthenticated: boolean;
  // if authenticated, there should be a user object
  user: User | null;
  // error message
  errorMessage: string | null;
  string: string | null;
  encode_string: string | null;
}

export const initialState: State = {
    isAuthenticated: false,
    user: null,
    errorMessage: null,
    string: null,
    encode_string: null
  };

  export function reducer(state = initialState, action: All): State {
    switch (action.type) {
      case AuthActionTypes.LOGIN_SUCCESS: {
        return {
          ...state,
          isAuthenticated: true,
          user: {
            token: action.payload.token,
            email: action.payload.email
          },
          errorMessage: null
        };
      }
      case AuthActionTypes.LOGIN_FAILURE: {
        return {
          ...state,
          errorMessage: 'Incorrect email and/or password.'
        };
      }
      case AuthActionTypes.ENCODE_SUCCESS: {
        return {
          ...state,
            encode_string: action.payload.encode_string
        };
      }
      case AuthActionTypes.LOGOUT: {
        return initialState;
      }
      default: {
        return state;
      }
    }
  }