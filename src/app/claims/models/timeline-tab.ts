import { Link } from '@pko/core';

export enum TimelineEventType {
    BEGIN_PROCESS           = 'BEGIN_PROCESS',
    DOCUMENT_SHARED         = 'DOCUMENT_SHARED',
    INSPECTION_SCHEDULED    = 'INSPECTION_SCHEDULED',
    MEDICAL_OPINION_SCHEDULED    = 'MEDICAL_OPINION_SCHEDULED',
    SEND_ACCOUNT_NUMBER     = 'SEND_ACCOUNT_NUMBER',
    SEND_DOCUMENT           = 'SEND_DOCUMENT',
    END_PROCESS             = 'END_PROCESS'
}

export interface TimelineTab {
    taskUUID?: string;
    eventType: TimelineEventType;
    eventDate: string;
    done: boolean;
    name: string;
    description: string;
    currentTask: boolean;
    links?: Array<Link>;
}
