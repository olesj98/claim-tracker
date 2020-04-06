import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'pko-footer',
    templateUrl: './footer.component.pug',
    styleUrls: ['./footer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent { }
