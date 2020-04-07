import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
    selector: 'pko-file',
    templateUrl: './file.component.pug',
    styleUrls: ['./file.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileComponent {
    @Input() name: string;
}
