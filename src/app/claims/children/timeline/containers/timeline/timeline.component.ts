import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'pko-timeline',
    templateUrl: './timeline.component.pug',
    styleUrls: ['./timeline.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimelineComponent implements OnInit {

    ngOnInit() {

    }

}
