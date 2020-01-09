import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import { TrackerLayoutService } from '@pko/tracker/services';

@Component({
    selector: 'pko-timeline',
    templateUrl: './timeline.component.pug',
    styleUrls: ['./timeline.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimelineComponent implements OnInit {
    minified$: Observable<boolean>;

    constructor(private _trackerLayout: TrackerLayoutService) {
        this.minified$ = this._trackerLayout.minified$;
    }

    ngOnInit() {

    }
}
