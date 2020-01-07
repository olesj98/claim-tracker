import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { TrackerLayoutService } from '../../services';

@Component({
    selector: 'pko-tracker',
    templateUrl: './tracker.component.pug',
    styleUrls: [ './tracker.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrackerComponent implements OnInit, OnDestroy {
    minified: boolean;

    destroyed$: Subject<void> = new Subject<void>();

    constructor(
        private _trackerLayout: TrackerLayoutService,
        private _changeDetectionRef: ChangeDetectorRef) {

        this._trackerLayout.minified$
            .pipe(takeUntil(this.destroyed$))
            .subscribe(minified => {
                this.minified = minified;
                this._changeDetectionRef.markForCheck();
            });
    }

    ngOnInit() {

    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
}
