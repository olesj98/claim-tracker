import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, UrlSerializer, UrlTree } from '@angular/router';
import { FormControl } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { MenuTab } from '../../models';

@Component({
    selector: 'pko-nav-menu',
    templateUrl: './nav-menu.component.pug',
    styleUrls: ['./nav-menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavMenuComponent implements OnInit, OnDestroy {
    @Input()
    set tabs(tabs: Array<MenuTab>) {
        this._tabs = tabs || [];
        this._updateSelectValue(this._router.url);
    }
    get tabs(): Array<MenuTab> {
        return this._tabs;
    }

    minified: boolean;
    menu = new FormControl();

    destroyed$: Subject<void> = new Subject<void>();

    private _tabs: Array<MenuTab>;

    constructor(
        observer: BreakpointObserver,
        changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _route: ActivatedRoute,
        private _serializer: UrlSerializer) {

        observer.observe('(max-width: 576px)')
            .pipe(takeUntil(this.destroyed$))
            .subscribe(e => {
                this.minified = e.matches;
                changeDetectorRef.markForCheck();
            });

        this.menu.valueChanges
            .pipe(takeUntil(this.destroyed$))
            .subscribe(path => this._router.navigate([path], { relativeTo: this._route }));

        this._router.events.pipe(
            filter(e => e instanceof NavigationEnd),
            takeUntil(this.destroyed$)
        )
            .subscribe((e: NavigationEnd) => this._updateSelectValue(e.url));
    }

    ngOnInit() {

    }

    private _getRelativePath(absolute: string): string {
        const tab = this.tabs.find(t => {
            const tree: UrlTree = this._router.createUrlTree([ t.link ], { relativeTo: this._route });
            return absolute === this._serializer.serialize(tree);
        });

        return tab && tab.link;
    }

    private _updateSelectValue(url: string): void {
        const relativePath = this._getRelativePath(url);
        this.menu.setValue(relativePath, { emitEvent: false });
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
}
