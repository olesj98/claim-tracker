import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MissingTranslationHandler, TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { defaultTranslationLoaderFactory } from './default-translation-loader-factory';
import { EmptyMissingTranslationHandler } from './empty-missing-translation-handler';

@NgModule({
    imports: [
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: defaultTranslationLoaderFactory,
                deps: [ HttpClient ]
            },
            defaultLanguage: 'pl',
            useDefaultLang: true
        })
    ],
    exports: [
        TranslateModule
    ]
})
export class TranslationConfigModule { }
