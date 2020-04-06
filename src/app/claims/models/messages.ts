export enum MessageRecipient {
    Adjuster = 'ADJUSTER',
    Client = 'CLIENT'
}

export interface DraftMessage {
    body: string;
}

export interface Message extends DraftMessage {
    postDate: number;
    recipient: MessageRecipient;
}
