import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatronComponent } from './containers/patron/patron.component';

export const patronRoutes: Routes = [
    { path: '', component: PatronComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(patronRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class PatronRoutingModule { }
