import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { NavigationModule } from '../shared/navigation';
import { ClaimsRoutingModule } from './claims-routing.module';

import { ClaimsComponent } from './containers/claims/claims.component';
import { ClaimDetailsComponent } from './containers/claim-details/claim-details.component';
import { ClaimsListComponent } from './components/claims-list/claims-list.component';
import { ClaimTileComponent } from './components/claim-tile/claim-tile.component';

import { reducers } from './reducers';

@NgModule({
    declarations: [
        ClaimsComponent,
        ClaimsListComponent,
        ClaimTileComponent,
        ClaimDetailsComponent
    ],
    imports: [
        CommonModule,
        StoreModule.forFeature('claims', reducers),
        NavigationModule,
        ClaimsRoutingModule
    ]
})
export class ClaimsModule { }
