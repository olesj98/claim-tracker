import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { LoginActions, fromAuth, UserActions, User } from '@pko/auth';
import { TrackerLayoutService } from '@pko/tracker/services';

@Component({
    selector: 'pko-tracker',
    templateUrl: './tracker.component.pug',
    styleUrls: [ './tracker.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrackerComponent implements OnInit, OnDestroy {
    user$: Observable<User>;
    minified: boolean;

    destroyed$: Subject<void> = new Subject<void>();

    constructor(
        private _store: Store<fromAuth.State>,
        private _layout: TrackerLayoutService,
        private _changeDetectionRef: ChangeDetectorRef) {

        this.user$ = this._store.pipe(select(fromAuth.getUser));

        this._layout.minified$
            .pipe(takeUntil(this.destroyed$))
            .subscribe(minified => {
                this.minified = minified;
                this._changeDetectionRef.markForCheck();
            });
    }

    ngOnInit() {
        this._store.dispatch(UserActions.fetch());
    }

    onLogout(): void {
        this._store.dispatch(LoginActions.logout());
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
}
