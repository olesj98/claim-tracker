import { Directive, HostListener, Input, OnDestroy } from '@angular/core';
import { of, Subject, Subscription } from 'rxjs';
import { catchError, exhaustMap, filter, mapTo } from 'rxjs/operators';

import { DocumentReaderService } from './document-reader.service';

@Directive({ selector: '[documentReader]' })
export class DocumentReaderDirective implements OnDestroy {
    @Input() documentReader: string;

    read$: Subject<void> = new Subject<void>();

    private _readSubscription: Subscription;

    constructor(private _reader: DocumentReaderService) {
        this._readSubscription = this.read$.pipe(
            filter(() => !!this.documentReader),
            exhaustMap(() =>
                this._reader.read(this.documentReader).pipe(
                    mapTo(this.documentReader),
                    catchError(e => {
                        try {
                            alert(JSON.stringify(e));
                        } catch (e) {
                            alert(e);
                        }
                        return of(null);
                    })
                )
            )
        )
            .subscribe(url => {
                alert(url);
                url && window.open(url);
            });
    }

    @HostListener('click') onclick(): void {
        this.read$.next();
    }

    ngOnDestroy(): void {
        this._readSubscription.unsubscribe();
    }
}
