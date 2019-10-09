import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Rx';
import { User } from './../../models/user';
import { AppState, selectAuthState } from './../../store/app.states';
import { EncodeString } from './../../store/actions/auth.actions';


@Component({
  selector: 'app-encode',
  templateUrl: './encode.component.html',
  styleUrls: ['./encode.component.scss']
})
export class EncodeComponent implements OnInit {

  user: User = new User();
  getState: Observable<any>;
  errorMessage: string | null;
  encode_string: string | null;

  constructor(
    private store: Store<AppState>
  ) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.getState.subscribe((state) => {
      console.log("state", state)
      this.errorMessage = state.errorMessage;
      this.encode_string= state.encode_string;
    });
  };

  onSubmit(): void {
    const payload = {
      string: this.user.string
    };
    this.store.dispatch(new EncodeString(payload));
  }

}
