import { Link } from '@pko/core';

export enum ClaimType {
    VEHICLE = 'VEHICLE',
    LUGGAGE = 'LUGGAGE',
    PROPERTY = 'PROPERTY',
    BODY_DAMAGE = 'BODY_DAMAGE',
    DEATH = 'DEATH'
}

export interface Claim {
    businessNumber: string;
    claimType: ClaimType;
    reportDate: string;
    details: string;
    adjusterName: string;
    unreadMessagesCount: number;
    links: Array<Link>;
}
