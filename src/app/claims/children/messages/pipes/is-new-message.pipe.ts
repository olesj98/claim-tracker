import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'isNewMessage' })
export class IsNewMessagePipe implements PipeTransform {
    transform(index: number, threadSize: number, unreadMessagesCount: number): boolean {
        return threadSize - unreadMessagesCount === index;
    }
}
