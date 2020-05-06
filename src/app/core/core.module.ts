import { LOCALE_ID, NgModule, Optional, SkipSelf } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import localePl from '@angular/common/locales/pl';

registerLocaleData(localePl, 'pl');

export function defaultTranslationLoader(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    imports: [
        AngularSvgIconModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: defaultTranslationLoader,
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
