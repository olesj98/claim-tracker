import { MessageSquashedPipe } from './message-squashed.pipe';
import { IsAnotherDayPipe } from './is-another-day.pipe';
import { MessageFromTodayPipe } from './message-from-today.pipe';

export const MessagePipes = [
    MessageSquashedPipe,
    IsAnotherDayPipe,
    MessageFromTodayPipe
];
