import { Directive, HostListener, Input, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
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
            .subscribe((response: HttpResponse<Blob>) => {
                if (response) {
                    const file = response.body;



                    this._openDocument(file, response.headers);
                }
            });
    }

    @HostListener('click') onclick(): void {
        this.read$.next();
    }

    private _openDocument(blob: Blob, headers: HttpHeaders): void {
        const contentDisposition = headers.get('Content-Disposition');
        const filename = contentDisposition.split(';')[1].split('=')[1].trim();
        const type = headers.get('Content-Type').split(';')[0];

        const file = new Blob([blob], { type });

        if (window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(file, filename);
        } else {
            const objectUrl = URL.createObjectURL(file);
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
