import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { NavMenuItemComponent } from './components/nav-menu-item/nav-menu-item.component';

@NgModule({
    declarations: [
        NavMenuComponent,
        NavMenuItemComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule
    ],
    exports: [
        NavMenuComponent,
        NavMenuItemComponent
    ]
})
export class NavigationModule { }
