import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

import { BottomSheetRef, BottomSheetService } from '@pko/shared/bottom-sheet';
import { TimelineEventType, TimelineInteractionEvent, TimelineTab } from '@pko/claims/models';

@Component({
    selector: 'pko-timeline-tabs',
    templateUrl: './timeline-tabs.component.pug',
    styleUrls: [ './timeline-tabs.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimelineTabsComponent {
    @Input()
    set timeline(timeline: Array<TimelineTab>) {
        this._timeline = timeline;

        if (this.selectedTab?.taskUUID && this._timeline) {
            this.selectedTab = this._timeline
                .find(timelineTab => timelineTab.taskUUID && timelineTab.taskUUID === this.selectedTab.taskUUID);
        }
    }
    get timeline(): Array<TimelineTab> {
        return this._timeline;
    }

    @Input()
    set minified(minified: boolean) {
        this._minified = coerceBooleanProperty(minified);

        if (!this._minified) {
            this.destroyBottomSheet();
        }
    }
    get minified(): boolean {
        return this._minified;
    }

    @Output() interactionEvent: EventEmitter<TimelineInteractionEvent<any>> = new EventEmitter<TimelineInteractionEvent<any>>();

    @ViewChild('contentTmpl') contentRef: TemplateRef<any>;

    private _minified: boolean;
    private _timeline: Array<TimelineTab>;
    private _bottomSheetRef: BottomSheetRef;

    selectedTab: TimelineTab = null;
    EventType: typeof TimelineEventType = TimelineEventType;

    constructor(private _bottomSheet: BottomSheetService) { }

    onTabSelected(tab: TimelineTab): void {
        this.selectedTab = tab;

        if (this.minified) {
            this._bottomSheetRef = this._bottomSheet.open(this.contentRef);
        }
    }

    destroyBottomSheet(): void {
        if (this._bottomSheetRef) {
            this._bottomSheetRef.dismiss();
            this._bottomSheetRef = null;
        }
    }
}
