import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { Claim } from '../../models';
import { ClaimsListActions } from '../../actions';

import * as fromClaims from '../../reducers';

@Component({
    selector: 'pko-claims',
    templateUrl: './claims.component.pug',
    styleUrls: [ './claims.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClaimsComponent implements OnInit, OnDestroy {
    claims$: Observable<Array<Claim>>;
    selectedClaimId$: Observable<string>;

    destroyed$: Subject<void> = new Subject<void>();

    constructor(
        private _store: Store<fromClaims.State>,
        private _route: ActivatedRoute,
        private _router: Router) {

        this.claims$ = this._store.pipe(select(fromClaims.getClaimsList));
        this.selectedClaimId$ = this._store.pipe(select(fromClaims.getSelectedClaimId));
    }

    ngOnInit() {
        this._route.params.pipe(
            map(params => ClaimsListActions.select({ id: params['id'] })),
            takeUntil(this.destroyed$)
        )
            .subscribe(this._store);
    }

    onClaimSelected(id: string): void {
        this._router.navigate(['/szkody', id]);
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
}
