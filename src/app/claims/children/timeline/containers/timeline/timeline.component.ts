import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { TrackerLayoutService } from '@pko/tracker/services';
import { TimelineActions } from '@pko/claims/actions';
import { TimelineItem } from '@pko/claims/models';

import * as fromClaims from '@pko/claims/reducers';

@Component({
    selector: 'pko-timeline',
    templateUrl: './timeline.component.pug',
    styleUrls: ['./timeline.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimelineComponent implements OnInit {
    minified$: Observable<boolean>;
    timeline$: Observable<Array<TimelineItem>>;

    constructor(
        private _trackerLayout: TrackerLayoutService,
        private _store: Store<fromClaims.State>) {

        this.minified$ = this._trackerLayout.minified$;
        this.timeline$ = this._store.pipe(select(fromClaims.getTimelineList));
    }

    ngOnInit() {
        this._store.dispatch(TimelineActions.enterTimelineView());
    }
}
