import { MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';

export class EmptyMissingTranslationHandler implements MissingTranslationHandler {
    handle(params: MissingTranslationHandlerParams): string {
        return params.translateService.instant('ALL.MISSING');
    }
}
