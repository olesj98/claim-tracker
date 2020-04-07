export enum ClaimType {
    VEHICLE = 'VEHICLE',
    LUGGAGE = 'LUGGAGE',
    PROPERTY = 'PROPERTY',
    BODY_DAMAGE = 'BODY_DAMAGE',
    DEATH = 'DEATH'
}

export interface Claim {
    claimUUID: string;
    claimType: ClaimType;
    reportDate: string;
    details: string;
    adjusterName: string;
    unreadMessagesCount: number;
}
