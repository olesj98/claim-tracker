import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClaimsComponent } from './containers/claims/claims.component';
import { ClaimDetailsComponent } from './containers/claim-details/claim-details.component';

export const claimsRoutes: Routes = [
    {
        path: '',
        component: ClaimsComponent
    },
    {
        path: ':id',
        component: ClaimDetailsComponent,
        children: [
            {
                path: '',
                redirectTo: 'os-czasu',
                pathMatch: 'full'
            },
            {
                path: 'os-czasu',
                loadChildren: () => import('./children/timeline/timeline.module')
                    .then(m => m.TimelineModule)
            },
            {
                path: 'dokumenty',
                loadChildren: () => import('./children/documents/documents.module')
                    .then(m => m.DocumentsModule)
            },
            {
                path: 'wiadomosci',
                loadChildren: () => import('./children/messages/messages.module')
                    .then(m => m.MessagesModule)
            },
            {
                path: 'opiekun-szkody',
                loadChildren: () => import('./children/patron/patron.module')
                    .then(m => m.PatronModule)
            }
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
