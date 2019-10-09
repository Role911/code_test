import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, CanActivate } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


//components
import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { EncodeComponent } from './components/encode/encode.component';

//interceptor
import { TokenInterceptor, ErrorInterceptor } from './services/token.interceptor';

//services
import { AuthService } from './services/auth.service'
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';

//effects
import { AuthEffects } from './store/effects/auth.effects';

//reducers
import { reducers } from './../app/store/app.states';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LogInComponent,
    EncodeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([AuthEffects]),
    RouterModule.forRoot([
      { path: 'log-in', component: LogInComponent },
      { path: 'encode', component: EncodeComponent,canActivate: [AuthGuard] },
      { path: '', component: LandingComponent },
      { path: '**', redirectTo: '/' }
    ])
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
