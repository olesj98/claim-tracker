import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { TimelineEventType, TimelineTab } from '@pko/claims/models';

@Component({
    selector: 'pko-timeline-tab-body',
    templateUrl: './timeline-tab-body.component.pug',
    styleUrls: ['./timeline-tab-body.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimelineTabBodyComponent {
    @Input() tab: TimelineTab;

    tabDateFormat = 'EEE dd.MM.yy | H.mm';
    EventType: typeof TimelineEventType = TimelineEventType;
}
