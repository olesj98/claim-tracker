import { NgModule } from '@angular/core';

import { PatronRoutingModule } from './patron-routing.module';

import { PatronComponent } from './containers/patron/patron.component';

@NgModule({
    declarations: [
        PatronComponent
    ],
    imports: [
        PatronRoutingModule
    ]
})
export class PatronModule { }
