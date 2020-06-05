import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

import { Message } from '@pko/claims/models';

@Pipe({ name: 'fromToday' })
export class MessageFromTodayPipe extends DatePipe implements PipeTransform {
    constructor(private _translate: TranslateService,
                @Inject(LOCALE_ID) locale: string) {
        super(locale);
    }

    transform(message: Message): string {
        const sentDate = new Date(message.postDate);
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        const isSameYear = sentDate.getFullYear() === today.getFullYear();
        const isSameMonth = sentDate.getMonth() === today.getMonth();

        const isYesterday = isSameYear && isSameMonth && sentDate.getDate() === yesterday.getDate();

        if (isYesterday) {
            return this._translate.instant('MESSAGES.YESTERDAY');
        } else {
            return super.transform(sentDate, isSameYear ? 'd MMMM' : 'longDate');
        }
    }
}
