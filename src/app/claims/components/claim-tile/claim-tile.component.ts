import {
    Component,
    ChangeDetectionStrategy,
    Input,
    HostBinding,
    Output,
    EventEmitter,
    HostListener
} from '@angular/core';

import { Claim } from '../../models';

@Component({
    selector: 'pko-claim-tile',
    templateUrl: './claim-tile.component.pug',
    styleUrls: [ './claim-tile.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClaimTileComponent {
    @Input() claim: Claim;
    @Input() @HostBinding('class.--active') active: boolean;

    @Output() selected: EventEmitter<void> = new EventEmitter<void>();

    @HostListener('click', []) onclick() {
        this.selected.emit();
    }
}
