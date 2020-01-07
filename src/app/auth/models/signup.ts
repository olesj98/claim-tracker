import { Credentials } from './credentials';

export interface Signup extends Credentials {
    pesel: string;
    pinConfirm: string;
}
