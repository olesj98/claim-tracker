import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { Claim } from '../../models';
import { ClaimsListActions } from '../../actions';

import * as fromClaims from '../../reducers';

@Component({
    selector: 'pko-claim-details',
    templateUrl: './claim-details.component.pug',
    styleUrls: [ './claim-details.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClaimDetailsComponent implements OnInit, OnDestroy {
    selectedClaim$: Observable<Claim>;
    destroyed$: Subject<void> = new Subject<void>();

    constructor(
        private _store: Store<fromClaims.State>,
        private _route: ActivatedRoute) {

        this.selectedClaim$ = this._store.pipe(select(fromClaims.getSelectedClaim));
    }

    ngOnInit() {
        this._route.params.pipe(
            map(params => ClaimsListActions.select({ id: params['id'] })),
            takeUntil(this.destroyed$)
        )
            .subscribe(this._store);
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
}
