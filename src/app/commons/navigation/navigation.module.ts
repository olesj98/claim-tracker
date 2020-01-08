import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SelectModule } from '../select';

import { NavMenuComponent } from './components/nav-menu/nav-menu.component';

@NgModule({
    declarations: [
        NavMenuComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        SelectModule
    ],
    exports: [
        NavMenuComponent
    ]
})
export class NavigationModule { }
