import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';

import { Claim } from '../../models';

@Component({
    selector: 'pko-claims-list',
    templateUrl: './claims-list.component.pug',
    styleUrls: [ './claims-list.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClaimsListComponent {
    @Input() claims: Array<Claim>;

    @Output() selected: EventEmitter<string> = new EventEmitter<string>();

    trackByClaimId = (index: number, claim: Claim) => claim.claimUUID;
}
