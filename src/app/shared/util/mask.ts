import { TextMaskConfig } from 'angular2-text-mask';

export class BaseMaskConfig implements Partial<TextMaskConfig> {
    guide = false;
}

export class PhoneNumberMaskConfig extends BaseMaskConfig implements TextMaskConfig {
    mask = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
}

export class PeselMaskConfig extends BaseMaskConfig implements TextMaskConfig {
    guide = true;
    mask = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
}

export class PinCellMaskConfig extends BaseMaskConfig implements TextMaskConfig {
    mask = [/\d/];
}

export class IbanMaskConfig extends BaseMaskConfig implements TextMaskConfig {
    mask = [/\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ',
        /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/];
}
