import { AuthEffects } from './auth.effects';
import { VerifySMSEffects } from './verify-sms.effects';
import { VerifyCredentialsEffects } from './verify-credentials.effects';
import { ConfigPINEffects } from './config-pin.effects';
import { UserEffects } from './user.effects';

export const AUTH_EFFECTS = [
    AuthEffects,
    VerifySMSEffects,
    VerifyCredentialsEffects,
    ConfigPINEffects,
    UserEffects
];
