import { Pipe, PipeTransform } from '@angular/core';

import { isSameDay } from '@pko/shared/util';
import { Message } from '@pko/claims/models';

@Pipe({ name: 'messageSquashed' })
export class MessageSquashedPipe implements PipeTransform {
    transform(message: Message, nextMessage?: Message, previousMessage?: Message): [boolean, boolean, boolean] {
        const isSquashed = nextMessage && nextMessage.recipient === message.recipient &&
            isSameDay(message.postDate, nextMessage.postDate);

        const hasPreviousMessageToday = previousMessage && previousMessage.recipient === message.recipient &&
            isSameDay(message.postDate, previousMessage.postDate);

        const isBetween = isSquashed && hasPreviousMessageToday;

        const isLastBeforeSquashed = !isSquashed && !isBetween && hasPreviousMessageToday;

        return [ isSquashed, isBetween, isLastBeforeSquashed ];
    }
}
