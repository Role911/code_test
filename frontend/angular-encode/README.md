# AngularEncode

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


# Components

- Landing
- Login
- Encode

# Services

- AuthGuard - protect route encode
- AuthService - api call
- Http Interceptor -add the authentication token and content type to the request headers, and on log out remove token from localstorage

# Actions
- LOGIN 
- LOGIN_SUCCESS,
- LOGIN_FAILURE,
- ENCODE_STRING,
- ENCODE_SUCCESS,
- LOGOUT