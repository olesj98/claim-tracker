import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AuthRoutingModule } from './auth-routing.module';

import { LoginComponent } from './containers/login/login.component';
import { SignupPathComponent } from './containers/signup-path/signup-path.component';
import { SignupComponent } from './containers/signup/signup.component';
import { SignupDoneComponent } from './containers/signup-done/signup-done.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginToolbarComponent } from './components/login-toolbar/login-toolbar.component';

import { AuthEffects } from './effects';

import { reducers } from './reducers';
import { SignupToolbarComponent } from './components/signup-toolbar/signup-toolbar.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';

@NgModule({
    declarations: [
        LoginComponent,
        SignupPathComponent,
        SignupComponent,
        SignupDoneComponent,
        LoginFormComponent,
        LoginToolbarComponent,
        SignupToolbarComponent,
        SignupFormComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        StoreModule.forFeature('auth', reducers),
        EffectsModule.forFeature([
            AuthEffects
        ]),
        AuthRoutingModule
    ]
})
export class AuthModule { }
