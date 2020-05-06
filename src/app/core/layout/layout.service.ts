import { Injectable } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LayoutService {
    private _isTabletOrSmallerDevice$: Observable<boolean>;

    constructor(private _observer: BreakpointObserver) { }

    isTabletOrSmallerDevice(): Observable<boolean> {
        if (!this._isTabletOrSmallerDevice$) {
            this._isTabletOrSmallerDevice$ =
                this._observer.observe('(max-width: 991px)').pipe(
                    map(e => e.matches),
                    shareReplay(1)
                );
        }

        return this._isTabletOrSmallerDevice$;
    }
}
