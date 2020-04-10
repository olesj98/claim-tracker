import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { TimelineEventType, DocumentLinkRel, TimelineTab } from '@pko/claims/models';

@Component({
    selector: 'pko-timeline-content-title',
    templateUrl: './timeline-content-title.component.pug',
    styleUrls: ['./timeline-content-title.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimelineContentTitleComponent {
    @Input() selectedTab: TimelineTab;

    EventType: typeof TimelineEventType = TimelineEventType;
    DocumentLinkRel: typeof DocumentLinkRel = DocumentLinkRel;
}
