import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimelineComponent } from './containers/timeline/timeline.component';

export const timelineRoutes: Routes = [
    { path: '', component: TimelineComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(timelineRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class TimelineRoutingModule { }
