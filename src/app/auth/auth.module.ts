import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';
import { ControlsModule } from '../shared/controls';

import { AuthService } from '@pko/auth/services';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './containers/login/login.component';
import { SignupPathComponent } from './containers/signup-path/signup-path.component';
import { SignupComponent } from './containers/signup/signup.component';
import { SMSComponent } from './containers/sms/sms.component';
import { PinSetComponent } from './containers/pin-set/pin-set.component';
import { SignupDoneComponent } from './containers/signup-done/signup-done.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginToolbarComponent } from './components/login-toolbar/login-toolbar.component';
import { SignupToolbarComponent } from './components/signup-toolbar/signup-toolbar.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { SMSFormComponent } from './components/sms-form/sms-form.component';
import { PinFormComponent } from './components/pin-form/pin-form.component';

import { AuthEffects, ConfigPINEffects, VerifyIdentityEffects, VerifySMSEffects } from './effects';
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
    SharedModule,
    ReactiveFormsModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([
      AuthEffects,
      VerifySMSEffects,
      VerifyIdentityEffects,
      ConfigPINEffects
    ]),
    ControlsModule,
    AuthRoutingModule
  ],
  providers: [AuthService]
})
export class AuthModule {}
