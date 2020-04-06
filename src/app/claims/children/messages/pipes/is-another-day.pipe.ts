import { Pipe, PipeTransform } from '@angular/core';

import { Message } from '@pko/claims/models';
import { isSameDay } from '@pko/shared/util';

@Pipe({ name: 'isAnotherDay' })
export class IsAnotherDayPipe implements PipeTransform {
    transform(message: Message, previousMessage?: Message): boolean {
        if (previousMessage) {
            return !isSameDay(message.postDate, previousMessage.postDate);
        }
    }
}
