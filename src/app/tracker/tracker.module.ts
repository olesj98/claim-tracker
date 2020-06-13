import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { TranslateModule } from '@ngx-translate/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { CommonAssetsModule } from '@pko/shared/common-assets';
import { FooterModule } from '@pko/shared/footer';

import { TrackerComponent } from './containers/tracker/tracker.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';

import { TrackerRoutingModule } from './tracker-routing.module';

@NgModule({
    declarations: [
        ToolbarComponent,
        TrackerComponent,
        UserMenuComponent,
        LogoutButtonComponent
    ],
    imports: [
        CommonModule,
        OverlayModule,
        TranslateModule,
        AngularSvgIconModule,
        CommonAssetsModule,
        FooterModule,
        TrackerRoutingModule
    ]
})
export class TrackerModule { }
