import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { TimelineEventType, TimelineTab } from '@pko/claims/models';

@Component({
    selector: 'pko-timeline-content-title',
    templateUrl: './timeline-content-title.component.pug',
    styleUrls: ['./timeline-content-title.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimelineContentTitleComponent {
    @Input() selectedTab: TimelineTab;
    @Input() minified: boolean;

    @Output() dismiss: EventEmitter<void> = new EventEmitter<void>();

    EventType: typeof TimelineEventType = TimelineEventType;

    get isTask(): boolean {
        return !!this.selectedTab.taskUUID;
    }

    get translationPostfix(): string {
        return this.minified ? '_MOBILE' : '';
    }
}
