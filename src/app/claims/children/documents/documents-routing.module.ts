import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocumentsComponent } from './containers/documents/documents.component';

export const documentsRoutes: Routes = [
    { path: '', component: DocumentsComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(documentsRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class DocumentsRoutingModule { }
