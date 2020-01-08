import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'pko-documents',
    templateUrl: './documents.component.pug',
    styleUrls: ['./documents.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentsComponent implements OnInit {
    ngOnInit() {

    }
}
