import { Directive, HostListener, Input, OnDestroy } from '@angular/core';
import { of, Subject, Subscription } from 'rxjs';
import { catchError, exhaustMap, filter } from 'rxjs/operators';

import { DocumentReaderService } from './document-reader.service';

@Directive({ selector: '[documentReader]' })
export class DocumentReaderDirective implements OnDestroy {
    @Input() documentReader: string;

    read$: Subject<void> = new Subject<void>();

    private _readSubscription: Subscription;

    constructor(reader: DocumentReaderService) {
        this._readSubscription = this.read$.pipe(
            filter(() => !!this.documentReader),
            exhaustMap(() =>
                reader.read(this.documentReader).pipe(
                    catchError(() => of(null))
                )
            )
        )
            .subscribe(response => response && this._openDocument(response));
    }

    @HostListener('click') onclick(): void {
        this.read$.next();
    }

    private _openDocument(document: Blob): void {
        if (window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(new Blob([document], { type: document.type }));
        } else {
            const objectUrl = URL.createObjectURL(document);
            const newTab = window.open(objectUrl, '_blank');

            if (!newTab) {
                window.location.href = objectUrl;
            }
        }
    }

    ngOnDestroy(): void {
        this._readSubscription.unsubscribe();
    }
}
