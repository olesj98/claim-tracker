import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { LayoutService } from '@pko/core';
import { TimelineActions } from '@pko/claims/actions';
import { TimelineEventType, TimelineInteractionEvent, TimelineTab } from '@pko/claims/models';

import * as fromClaims from '@pko/claims/reducers';

@Component({
    selector: 'pko-timeline',
    templateUrl: './timeline.component.pug',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimelineComponent implements OnInit {
    minified$: Observable<boolean>;
    timeline$: Observable<Array<TimelineTab>>;

    constructor(
        private _layout: LayoutService,
        private _store: Store<fromClaims.State>) {

        this.minified$ = this._layout.isTabletOrSmallerDevice();
        this.timeline$ = this._store.pipe(select(fromClaims.getFeedsList));
    }

    ngOnInit() {
        this._store.dispatch(TimelineActions.enterTimelineView());
    }

    onEventReceived(event: TimelineInteractionEvent<any>): void {
        switch (event.eventType) {
            case TimelineEventType.SEND_ACCOUNT_NUMBER: {
                this._store.dispatch(TimelineActions.sendAccountNumber({ event }));
                break;
            }
            case TimelineEventType.SEND_DOCUMENT: {
                this._store.dispatch(TimelineActions.sendDocument({ event }));
                break;
            }
            default:
                break;
        }
    }
}
