import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { filter, map, startWith, takeUntil } from 'rxjs/operators';

import { Claim, TimelineTab } from '../../models';
import { ClaimDetailsActions, ClaimsListActions } from '../../actions';

import * as fromClaims from '../../reducers';

@Component({
    selector: 'pko-claim-details',
    templateUrl: './claim-details.component.pug',
    styleUrls: [ './claim-details.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClaimDetailsComponent implements OnInit, OnDestroy {
    selectedClaim$: Observable<Claim>;
    hasManyClaims$: Observable<boolean>;
    unreadMessagesCount$: Observable<number>;
    messagesVisible$: Observable<boolean>;
    currentTask$: Observable<TimelineTab>;

    destroyed$: Subject<void> = new Subject<void>();

    constructor(
        private _store: Store<fromClaims.State>,
        private _router: Router,
        private _route: ActivatedRoute) {

        this.selectedClaim$ = this._store.pipe(select(fromClaims.getSelectedClaim));
        this.hasManyClaims$ = this._store.pipe(select(fromClaims.getHasManyClaims));
        this.unreadMessagesCount$ = this._store.pipe(select(fromClaims.getUnreadMessageCount));
        this.currentTask$ = this._store.pipe(select(fromClaims.getLatestFeed));
        this.messagesVisible$ = this.isNotMessagesRoute();
    }

    ngOnInit() {
        this.selectClaimOnParamsChange();
    }

    selectClaimOnParamsChange(): void {
        this._route.params.pipe(
            map(params => ClaimsListActions.select({ id: params['id'] })),
            takeUntil(this.destroyed$)
        )
            .subscribe(this._store);
    }

    isNotMessagesRoute(): Observable<boolean> {
        return this._router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            startWith(this._route),
            map(() => !this._route.firstChild.snapshot.data.messagesHidden)
        );
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
        this._store.dispatch(ClaimDetailsActions.flush());
    }
}
