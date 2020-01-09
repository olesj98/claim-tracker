import {
    Component,
    ChangeDetectionStrategy,
    ContentChildren,
    QueryList,
    Input,
    OnDestroy,
    ViewChild
} from '@angular/core';
import { CdkPortalOutlet } from '@angular/cdk/portal';

import { BottomSheetService } from '@pko/commons/bottom-sheet';

import { TimelineTabComponent } from '../timeline-tab/timeline-tab.component';

@Component({
    selector: 'pko-timeline-tabs',
    templateUrl: './timeline-tabs.component.pug',
    styleUrls: [ './timeline-tabs.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimelineTabsComponent implements OnDestroy {
    @Input()
    set minified(minified: boolean) {
        this._minified = minified;
    }

    get minified(): boolean {
        return this._minified;
    }

    @ContentChildren(TimelineTabComponent, { descendants: true }) allTabs: QueryList<TimelineTabComponent>;
    @ViewChild(CdkPortalOutlet, { static: true }) private _portalOutlet: CdkPortalOutlet;

    activeTabIndex: number = null;

    private _minified: boolean;

    get isEmpty(): boolean {
        return !this._portalOutlet.hasAttached();
    }

    constructor(private _bottomSheet: BottomSheetService) { }

    onTabSelected(tab: TimelineTabComponent, i: number): void {
        if (!tab.disabled && this.activeTabIndex !== i) {
            this.activeTabIndex = i;

            if (this.minified) {
                this._portalOutlet.detach();
                this._bottomSheet.open(tab.content.templateRef);
            } else {
                this._portalOutlet.detach();
                this._portalOutlet.attachTemplatePortal(tab.content);
            }
        }
    }

    ngOnDestroy(): void {
        this._portalOutlet.dispose();
    }
}
