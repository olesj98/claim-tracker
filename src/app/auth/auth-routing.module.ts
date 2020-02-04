import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './containers/login/login.component';
import { SignupPathComponent } from './containers/signup-path/signup-path.component';
import { SignupComponent } from './containers/signup/signup.component';
import { SignupDoneComponent } from './containers/signup-done/signup-done.component';
import { SMSComponent } from './containers/sms/sms.component';
import { PinSetComponent } from './containers/pin-set/pin-set.component';

const authRoutes: Routes = [
    {
        path: 'logowanie',
        component: LoginComponent
    },
    {
        path: 'rejestracja',
        component: SignupPathComponent,
        children: [
            {
                path: '',
                component: SignupComponent
            },
            {
                path: 'sms',
                component: SMSComponent
            },
            {
                path: 'pin',
                component: PinSetComponent
            },
            {
                path: 'ok',
                component: SignupDoneComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(authRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AuthRoutingModule { }
