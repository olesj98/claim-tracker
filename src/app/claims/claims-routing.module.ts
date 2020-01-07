import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClaimsComponent } from './containers/claims/claims.component';

export const claimsRoutes: Routes = [
    {
        path: '',
        component: ClaimsComponent
    },
    {
        path: ':id',
        component: ClaimsComponent,
        children: [

        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(claimsRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class ClaimsRoutingModule { }
