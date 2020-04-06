import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterModule } from '../shared/footer';

import { TrackerComponent } from './containers/tracker/tracker.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';

import { TrackerRoutingModule } from './tracker-routing.module';

import { TRACKER_PIPES } from './pipes';

@NgModule({
    declarations: [
        ToolbarComponent,
        TrackerComponent,
        UserMenuComponent,
        ...TRACKER_PIPES
    ],
    imports: [
        CommonModule,
        FooterModule,
        TrackerRoutingModule
    ]
})
export class TrackerModule { }
