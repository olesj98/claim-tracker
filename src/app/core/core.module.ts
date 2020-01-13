import { LOCALE_ID, NgModule, Optional, SkipSelf } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';

import localePl from '@angular/common/locales/pl';

registerLocaleData(localePl, 'pl');

@NgModule({
    declarations: [],
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
