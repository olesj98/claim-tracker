import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

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
        TranslateModule,
        CommonPipesModule,
        FooterModule,
        TrackerRoutingModule
    ]
})
export class TrackerModule { }
