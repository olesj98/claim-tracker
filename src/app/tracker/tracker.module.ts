import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonPipesModule } from '@pko/shared/common-pipes';
import { FooterModule } from '@pko/shared/footer';

import { TrackerComponent } from './containers/tracker/tracker.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';

import { TrackerRoutingModule } from './tracker-routing.module';

@NgModule({
    declarations: [
        ToolbarComponent,
        TrackerComponent,
        UserMenuComponent
    ],
    imports: [
        CommonModule,
        CommonPipesModule,
        FooterModule,
        TrackerRoutingModule
    ]
})
export class TrackerModule { }
