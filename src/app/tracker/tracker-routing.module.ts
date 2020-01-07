import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackerComponent } from './containers/tracker/tracker.component';

export const trackerRoutes: Routes = [
    {
        path: '',
        component: TrackerComponent,
        children: [
            {
                path: '',
                redirectTo: 'szkody',
                pathMatch: 'full'
            },
            {
                path: 'szkody',
                loadChildren: () => import('../claims/claims.module')
                    .then(m => m.ClaimsModule)
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(trackerRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class TrackerRoutingModule { }
