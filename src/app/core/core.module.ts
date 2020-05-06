import { LOCALE_ID, NgModule, Optional, SkipSelf } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';

import localePl from '@angular/common/locales/pl';

import { TranslationConfigModule } from '@pko/translation';

registerLocaleData(localePl, 'pl');

@NgModule({
    imports: [
        AngularSvgIconModule.forRoot(),
        TranslationConfigModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: LOCALE_ID, useValue: 'pl-PL' }
    ]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parent: CoreModule) {
        if (parent) {
            throw new Error('CoreModule was already loaded. Import this module in AppModule only!');
        }
    }
}
