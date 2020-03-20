export interface Signup {
  phoneNumber: string;
  pesel: string;
}

export interface SmsVerification extends Signup {
  code: string;
}

export interface SignupPIN {
  pin: string;
  pinConfirm: string;
}
