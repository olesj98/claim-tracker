import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
    selector: 'pko-messenger-announcement',
    templateUrl: './messenger-announcement.component.pug',
    styleUrls: ['./messenger-announcement.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessengerAnnouncementComponent {
    @Input() info: boolean;
}
