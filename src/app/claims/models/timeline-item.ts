export enum TimelineEventType {
    BEGIN_PROCESS           = 'BEGIN_PROCESS',
    SHARED_DOCUMENT         = 'SHARED_DOCUMENT',
    SCHEDULED_INSPECTION    = 'SCHEDULED_INSPECTION',
    SEND_ACCOUNT_NUMBER     = 'SEND_ACCOUNT_NUMBER',
    SEND_DOCUMENT           = 'SEND_DOCUMENT',
    END_PROCESS             = 'END_PROCESS'
}

export interface TimelineItem {
    eventType: TimelineEventType;
    eventDate: string;
    done: boolean;
    name: string;
    description: string;
}
