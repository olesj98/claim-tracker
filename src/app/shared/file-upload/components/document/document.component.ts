import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
    selector: 'pko-document',
    templateUrl: './document.component.pug',
    styleUrls: ['./document.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentComponent {
    @Input() filename: string;
    @Input() postDate: string;
    @Input() hrefToGet: string;
}
