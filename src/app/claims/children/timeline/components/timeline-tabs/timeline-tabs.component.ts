import {
    Component,
    ChangeDetectionStrategy,
    ContentChildren,
    QueryList,
    Input,
    OnDestroy,
    ViewChild,
    AfterContentInit,
    ChangeDetectorRef
} from '@angular/core';
import { CdkPortalOutlet } from '@angular/cdk/portal';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { BottomSheetService } from '@pko/shared/bottom-sheet';

import { TimelineTabComponent } from '../timeline-tab/timeline-tab.component';

@Component({
    selector: 'pko-timeline-tabs',
    templateUrl: './timeline-tabs.component.pug',
    styleUrls: [ './timeline-tabs.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimelineTabsComponent implements OnDestroy, AfterContentInit {
    @Input()
    set minified(minified: boolean) {
        this._minified = coerceBooleanProperty(minified);
    }
    get minified(): boolean {
        return this._minified;
    }

    @ContentChildren(TimelineTabComponent, { descendants: true }) allTabs: QueryList<TimelineTabComponent>;
    @ViewChild(CdkPortalOutlet, { static: false }) private _portalOutlet: CdkPortalOutlet;

    tabActive: TimelineTabComponent = null;
    destroyed$: Subject<void> = new Subject<void>();

    private _minified: boolean;

    constructor(
        private _bottomSheet: BottomSheetService,
        private _changeDetectorRef: ChangeDetectorRef) {
    }

    ngAfterContentInit(): void {
        this.allTabs.changes
            .pipe(takeUntil(this.destroyed$))
            .subscribe(() => this._changeDetectorRef.markForCheck());
    }

    onTabSelected(tab: TimelineTabComponent): void {
        this.tabActive = tab;
        this._portalOutlet.detach();
        this._portalOutlet.attachTemplatePortal(tab.content);
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
        this._portalOutlet.dispose();
    }
}
