import { Component, ChangeDetectionStrategy } from '@angular/core';

import { bottomBarAnimation } from './bottom-bar.animation';

@Component({
    selector: 'pko-bottom-bar',
    templateUrl: './bottom-bar.component.pug',
    styleUrls: [ './bottom-bar.component.scss' ],
    animations: [ bottomBarAnimation ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BottomBarComponent { }
