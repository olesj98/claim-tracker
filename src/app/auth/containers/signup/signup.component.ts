import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Signup } from '../../models';
import { SignupActions } from '../../actions';

import * as fromRoot from '@pko/core/reducers';
import * as fromAuth from '../../reducers';
import { Observable } from 'rxjs';

import { ErrorInfo } from '@pko/core/error';

@Component({
  selector: 'pko-signup',
  templateUrl: './signup.component.pug',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent {

  error$: Observable<ErrorInfo>;

  constructor(private _store: Store<fromAuth.State>) {
    this.error$ = _store.pipe(select(fromRoot.getError));
  }

  signup(data: Signup): void {
    this._store.dispatch(SignupActions.verify({ data }));
  }
}
