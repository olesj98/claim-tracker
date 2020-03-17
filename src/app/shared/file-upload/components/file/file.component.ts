import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'pko-file',
    templateUrl: './file.component.pug',
    styleUrls: ['./file.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileComponent {
    @Input() name: string;
    @Input() removeable: boolean;

    @Output() remove: EventEmitter<void> = new EventEmitter<void>();
}
