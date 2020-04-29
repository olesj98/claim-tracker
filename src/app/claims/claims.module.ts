import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule } from '@ngx-translate/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { NavigationModule } from '../shared/navigation';
import { ClaimsRoutingModule } from './claims-routing.module';

import { ClaimsComponent } from './containers/claims/claims.component';
import { ClaimDetailsComponent } from './containers/claim-details/claim-details.component';
import { ClaimsListComponent } from './components/claims-list/claims-list.component';
import { ClaimTileComponent } from './components/claim-tile/claim-tile.component';
import { ClaimStatusComponent } from './components/claim-status/claim-status.component';

import { ClaimsEffects, DocumentsEffects, MessagesEffects, TimelineEffects } from './effects';
import { reducers } from './reducers';

@NgModule({
    declarations: [
        ClaimsComponent,
        ClaimsListComponent,
        ClaimTileComponent,
        ClaimDetailsComponent,
        ClaimStatusComponent
    ],
    imports: [
        CommonModule,
        StoreModule.forFeature('claims', reducers),
        EffectsModule.forFeature([
            ClaimsEffects,
            MessagesEffects,
            TimelineEffects,
            DocumentsEffects
        ]),
        AngularSvgIconModule,
        TranslateModule,
        NavigationModule,
        ClaimsRoutingModule
    ]
})
export class ClaimsModule { }
