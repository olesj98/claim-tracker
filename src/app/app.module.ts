import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '@pko-env/environment';

import { CoreModule, fromRoot } from '@pko/core';
import { AuthModule } from '@pko/auth';

import { TrackerModule } from './tracker/tracker.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        StoreModule.forRoot(fromRoot.ROOT_REDUCERS, {
            runtimeChecks: {
                strictStateSerializability: true,
                strictActionSerializability: true,
                strictStateImmutability: true,
                strictActionImmutability: true
            }
        }),
        EffectsModule.forRoot([]),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production
        }),
        ServiceWorkerModule
            .register('ngsw-worker.js', { enabled: environment.production }),
        CoreModule,
        AuthModule,
        TrackerModule,
        AppRoutingModule
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
