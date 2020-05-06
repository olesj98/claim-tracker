import { LOCALE_ID, NgModule, Optional, SkipSelf } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';

import localePl from '@angular/common/locales/pl';

import { TranslationConfigModule } from '@pko/translation';
import { DialogModule } from '@pko/shared/dialog';
import { BottomSheetModule } from '@pko/shared/bottom-sheet';

import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';

import { CORE_INTERCEPTORS } from './interceptors';

registerLocaleData(localePl, 'pl');

@NgModule({
    declarations: [
        ErrorDialogComponent
    ],
    imports: [
        AngularSvgIconModule.forRoot(),
        TranslationConfigModule,
        DialogModule,
        BottomSheetModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: LOCALE_ID, useValue: 'pl-PL' },
        ...CORE_INTERCEPTORS
    ]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parent: CoreModule) {
        if (parent) {
            throw new Error('CoreModule was already loaded. Import this module in AppModule only!');
        }
    }
}
