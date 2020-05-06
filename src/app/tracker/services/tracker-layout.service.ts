import { Injectable } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TrackerLayoutService {
    minified$: Observable<boolean>;

    constructor(observer: BreakpointObserver) {
        this.minified$ = observer.observe('(max-width: 991px)').pipe(
            map(e => e.matches),
            shareReplay(1)
        );
    }
}
