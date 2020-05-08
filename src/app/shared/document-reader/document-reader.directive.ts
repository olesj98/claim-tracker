import { Directive, HostListener, Inject, Input, OnDestroy } from '@angular/core';
import { of, Subject, Subscription } from 'rxjs';
import { catchError, exhaustMap, filter, mapTo } from 'rxjs/operators';

import { DocumentReaderService } from './document-reader.service';
import { DOCUMENT } from '@angular/common';

@Directive({ selector: '[documentReader]' })
export class DocumentReaderDirective implements OnDestroy {
    @Input() documentReader: string;

    read$: Subject<void> = new Subject<void>();

    private _readSubscription: Subscription;

    constructor(
        reader: DocumentReaderService,
        @Inject(DOCUMENT) private _document: any) {

        this._readSubscription = this.read$.pipe(
            filter(() => !!this.documentReader),
            exhaustMap(() =>
                reader.read(this.documentReader).pipe(
                    mapTo(this.documentReader),
                    catchError(() => of(null))
                )
            )
        )
            .subscribe(url => url && this._openDocument(url));
    }

    @HostListener('click') onclick(): void {
        this.read$.next();
    }

    private _openDocument(url: string): void {
        const a: HTMLLinkElement = this._document.createElement('a');
        a.target = '_blank';
        a.href = url;

        a.click();
    }

    ngOnDestroy(): void {
        this._readSubscription.unsubscribe();
    }
}
