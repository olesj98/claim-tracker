import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'sanitizer' })
export class SanitazerPipe implements PipeTransform {
    constructor(private _sanitizer: DomSanitizer) { }

    transform(value: string): any {
        return this._sanitizer.bypassSecurityTrustHtml(value);
    }
}
