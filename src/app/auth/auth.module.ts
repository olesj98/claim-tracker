import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TextMaskModule } from 'angular2-text-mask';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ControlsModule } from '../shared/controls';
import { FooterModule } from '../shared/footer';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './containers/login/login.component';
import { SignupPathComponent } from './containers/signup-path/signup-path.component';
import { SignupComponent } from './containers/signup/signup.component';
import { SMSComponent } from './containers/sms/sms.component';
import { PinSetComponent } from './containers/pin-set/pin-set.component';
import { SignupDoneComponent } from './containers/signup-done/signup-done.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignupToolbarComponent } from './components/signup-toolbar/signup-toolbar.component';
import { LoginToolbarComponent } from './components/login-toolbar/login-toolbar.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { SMSFormComponent } from './components/sms-form/sms-form.component';
import { PinFormComponent } from './components/pin-form/pin-form.component';

import { XsrfInterceptor, ErrorInterceptor } from './services';
import { AUTH_EFFECTS } from './effects';
import { reducers } from './reducers';

@NgModule({
    declarations: [
        LoginComponent,
        SignupPathComponent,
        SignupComponent,
        SMSComponent,
        PinSetComponent,
        SignupDoneComponent,
        LoginFormComponent,
        LoginToolbarComponent,
        SignupToolbarComponent,
        SignupFormComponent,
        SMSFormComponent,
        PinFormComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TranslateModule,
        AngularSvgIconModule,
        TextMaskModule,
        StoreModule.forFeature('auth', reducers),
        EffectsModule.forFeature(AUTH_EFFECTS),
        FooterModule,
        ControlsModule,
        AuthRoutingModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: XsrfInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ]
})
export class AuthModule { }
