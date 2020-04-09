import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Claim } from '../../models';

import * as fromClaims from '../../reducers';

@Component({
    selector: 'pko-claims',
    templateUrl: './claims.component.pug',
    styleUrls: [ './claims.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClaimsComponent {
    claims$: Observable<Array<Claim>>;

    constructor(
        private _store: Store<fromClaims.State>,
        private _router: Router) {

        this.claims$ = this._store.pipe(select(fromClaims.getClaimsList));
    }

    onClaimSelected(id: string): void {
        this._router.navigate(['/szkody', id]);
    }
}
