import { Action } from '@ngrx/store';


export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  ENCODE_STRING = '[Auth] Encode',
  ENCODE_SUCCESS = '[Auth] Encode Success',
  GET_STATUS = '[Auth] GetStatus',
  LOGOUT = '[Auth] LogOut'
}

export class LogIn implements Action {
  readonly type = AuthActionTypes.LOGIN;
  constructor(public payload: any) {}
}

export class LogInSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
  constructor(public payload: any) {}
}

export class LogInFailure implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILURE;
  constructor(public payload: any) {}
}

export class EncodeString implements Action {
  readonly type = AuthActionTypes.ENCODE_STRING;
  constructor(public payload: any) {}
}
export class EncodeSuccess implements Action {
  readonly type = AuthActionTypes.ENCODE_SUCCESS;
  constructor(public payload: any) {}
}
export class GetStatus implements Action {
  readonly type = AuthActionTypes.GET_STATUS;
}

export class LogOut implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}


export type All =
  | LogIn
  | LogInSuccess
  | LogInFailure
  | EncodeString
  | EncodeSuccess
  | GetStatus
  | LogOut
