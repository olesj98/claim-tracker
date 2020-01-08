import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
    selector: 'pko-message-date',
    templateUrl: './message-date.component.pug',
    styleUrls: ['./message-date.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageDateComponent {
    @Input() time: number;
}
