import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { TimelineTab } from '../../models';

@Component({
    selector: 'pko-claim-status',
    templateUrl: './claim-status.component.pug',
    styleUrls: ['./claim-status.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClaimStatusComponent {
    @Input() task: TimelineTab;
}
