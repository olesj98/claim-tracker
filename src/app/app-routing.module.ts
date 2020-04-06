import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

export const appRoutes: Routes = [];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {
            useHash: true,
            preloadingStrategy: PreloadAllModules
        })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
