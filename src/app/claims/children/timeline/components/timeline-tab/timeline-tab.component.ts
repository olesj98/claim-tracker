import {
    Component,
    ChangeDetectionStrategy,
    Input,
    ViewChild,
    TemplateRef,
    ViewContainerRef,
    OnInit
} from '@angular/core';
import { TemplatePortal } from '@angular/cdk/portal';

@Component({
    selector: 'pko-timeline-tab',
    templateUrl: './timeline-tab.component.pug',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimelineTabComponent implements OnInit {
    @Input() disabled: boolean;
    @Input() title: string;
    @Input() description: string;
    @Input() action: string;
    @Input() completed: boolean;

    @ViewChild(TemplateRef, { static: true }) private _implicitRef: TemplateRef<any>;

    private _contentPortal: TemplatePortal | null = null;

    get content(): TemplatePortal | null {
        return this._contentPortal;
    }

    constructor(private _viewContainerRef: ViewContainerRef) { }

    ngOnInit() {
        this._contentPortal = new TemplatePortal(this._implicitRef, this._viewContainerRef);
    }
}
