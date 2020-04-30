export enum MessageRecipient {
    Adjuster = 'ADJUSTER',
    Client = 'CLIENT'
}

export interface DraftMessage {
    body: string;
}

export interface Message extends DraftMessage {
    partyName: string;
    postDate: string;
    notificationDate: string;
    recipient: MessageRecipient;
}
