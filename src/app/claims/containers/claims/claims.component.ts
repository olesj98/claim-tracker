import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Claim } from '../../models';
import { ClaimsListActions } from '../../actions';

import * as fromClaims from '../../reducers';

@Component({
    selector: 'pko-claims',
    templateUrl: './claims.component.pug',
    styleUrls: [ './claims.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClaimsComponent implements OnInit {
    claims$: Observable<Array<Claim>>;

    constructor(
        private _store: Store<fromClaims.State>,
        private _router: Router) {

        this.claims$ = this._store.pipe(select(fromClaims.getClaimsList));
    }

    ngOnInit(): void {
        this._store.dispatch(ClaimsListActions.fetch());
    }

    onClaimSelected(id: string): void {
        this._router.navigate(['/szkody', id]);
    }
}
