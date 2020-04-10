import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { TimelineEventType, TimelineInteractionEvent, TimelineTab } from '@pko/claims/models';

@Component({
    selector: 'pko-timeline-content',
    templateUrl: './timeline-content.component.pug',
    styleUrls: ['./timeline-content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimelineContentComponent {
    @Input() selectedTab: TimelineTab;

    @Output() interactionEvent: EventEmitter<TimelineInteractionEvent<any>> = new EventEmitter<TimelineInteractionEvent<any>>();

    EventType: typeof TimelineEventType = TimelineEventType;

    get isSelected(): boolean {
        return this.selectedTab !== null;
    }

    onInteractionEvent(eventValue: any): void {
        this.interactionEvent.emit({
            value: eventValue,
            links: this.selectedTab.links,
            eventType: this.selectedTab.eventType
        });
    }
}
