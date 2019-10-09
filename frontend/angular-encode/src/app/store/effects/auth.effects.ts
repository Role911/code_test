
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Rx';
import { ofType } from '@ngrx/effects';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { tap } from 'rxjs/operators';
import 'rxjs/add/operator/switchMap';
import { AuthService } from '../../services/auth.service';



import {
    AuthActionTypes,
    LogIn, LogInSuccess, LogInFailure, EncodeString, EncodeSuccess, GetStatus, LogOut
} from './../actions/auth.actions';


@Injectable()
export class AuthEffects {

    constructor(
        private actions: Actions,
        private authService: AuthService,
        private router: Router,
    ) { }

    @Effect()
    LogIn: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGIN))
        .map((action: LogIn) => action.payload)
        .switchMap(payload => {
            return this.authService.logIn(payload.email, payload.password)
                .map((user) => {
                    console.log(user.token);
                    return new LogInSuccess({ token: user.token });
                })
                .catch((error) => {
                    console.log("LOG", error.statusText);
                    return Observable.of(new LogInFailure({ error: error }));
                });
        });

    @Effect({ dispatch: false })
    LogInSuccess: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGIN_SUCCESS),
        tap((user) => {
            localStorage.setItem('token', user.payload.token);
            this.router.navigateByUrl('/encode');
        })

    );
    @Effect({ dispatch: false })
    LogOut: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGOUT),
        tap((user) => {
            localStorage.removeItem('token');
        })
    )
    @Effect()
    EncodeString: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.ENCODE_STRING))
        .map((action: EncodeString) => action.payload)
        .switchMap(payload => {
            return this.authService.encode(payload.string)
                .map((payload) => {
                    console.log("string", payload.encode_string);
                    return new EncodeSuccess({ encode_string: payload.encode_string });
                })
        });

    @Effect({ dispatch: false })
    EncodeSuccess: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.ENCODE_SUCCESS)
    );


    @Effect({ dispatch: false })
    GetStatus: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.GET_STATUS))
        .map((action: GetStatus) => action)
        .switchMap(payload => {
            return this.authService.getStatus();
        });
}