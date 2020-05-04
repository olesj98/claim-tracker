export enum HttpErrorCodes {
    INVALID_AUTH = 'auth.authentication.error',
    ACCOUNT_LOCKED = 'auth.account-locked.error',
    NOT_AUTHORIZED = 'auth.invalid-data-or-state.error',
    TOO_MANY_VERIFICATIONS = 'auth.too-many-verifications.error',
    INVALID_VERIFICATION_CODE = 'auth.invalid-verification.error',
    FORBIDDEN = 'auth.forbidden.error'
}
