import { Pipe, PipeTransform } from '@angular/core';

import { isSameDay } from '@pko/shared/util';
import { Message } from '@pko/claims/models';

import { MessageConfig } from '../klasses';

@Pipe({ name: 'messageConfig' })
export class MessageConfigPipe implements PipeTransform {
    transform(message: Message, nextMessage?: Message, previousMessage?: Message): MessageConfig {
        const hasNextMessageToday = nextMessage && nextMessage.recipient === message.recipient &&
            isSameDay(new Date(message.postDate), new Date(nextMessage.postDate));

        const hasPreviousMessageToday = previousMessage && previousMessage.recipient === message.recipient &&
            isSameDay(new Date(message.postDate), new Date(previousMessage.postDate));

        return new MessageConfig(hasNextMessageToday, hasPreviousMessageToday);
    }
}
