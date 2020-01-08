import { User } from '@pko/auth/models';

export interface DraftMessage {
    subject?: string;
    body: string;
}

export interface Message {
    from: User;
    date: number;
    body: string;
}

export interface Thread {
    id: string;
    subject: string;
    messages: Array<Message>;
}
