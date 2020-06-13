import { MessageConfigPipe } from './message-config.pipe';
import { IsAnotherDayPipe } from './is-another-day.pipe';
import { MessageFromTodayPipe } from './message-from-today.pipe';
import { IsNewMessagePipe } from './is-new-message.pipe';

export const MessagePipes = [
    MessageConfigPipe,
    IsAnotherDayPipe,
    IsNewMessagePipe,
    MessageFromTodayPipe
];
