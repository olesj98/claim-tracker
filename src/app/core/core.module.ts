import { LOCALE_ID, NgModule, Optional, SkipSelf } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import localePl from '@angular/common/locales/pl';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

registerLocaleData(localePl, 'pl');

export const httpLoaderFactory = (http: HttpClient) => {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

@NgModule({
    imports: [
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: httpLoaderFactory,
                deps: [ HttpClient ]
            },
            defaultLanguage: 'pl',
            useDefaultLang: true
        })
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
