import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrackerComponent } from './containers/tracker/tracker.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { BottomBarComponent } from './components/bottom-bar/bottom-bar.component';

import { TrackerRoutingModule } from './tracker-routing.module';

@NgModule({
    declarations: [
        ToolbarComponent,
        TrackerComponent,
        UserMenuComponent,
        BottomBarComponent
    ],
    imports: [
        CommonModule,
        TrackerRoutingModule
    ]
})
export class TrackerModule { }
