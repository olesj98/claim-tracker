export interface ErrorInfo {
  id: number;
  type: string;
  code?: ErrorCode | string;
  message: string;
}

export enum ErrorCode {
  AUTH = 'auth.authentication.error',
  ACCOUNT_LOCKED = 'auth.account-locked.error'
}
