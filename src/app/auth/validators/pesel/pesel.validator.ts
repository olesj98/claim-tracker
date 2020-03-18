import { AbstractControl, ValidationErrors } from '@angular/forms';

import { PeselDataExtractor } from '../pesel/pesel-data.extractor';

export class PeselValidator {
  static validate(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    return PeselValidator.isPeselValid(control.value) ? null : { pesel: true };
  }

  private static isPeselValid(pesel: string): boolean {
    if (!pesel) { return false; }

    if (pesel.length !== 11) { return false; }

    const realDay = PeselDataExtractor.getDay(pesel);
    const realMonth = PeselDataExtractor.getMonth(pesel);
    const realYear = PeselDataExtractor.getYear(pesel);
    const startHour = 12;
    const startMinute = 30;
    const date = new Date(realYear, realMonth - 1, realDay, startHour, startMinute);
    date.setHours(startHour + date.getTimezoneOffset() / 60, 30);

    return this.validateControlNumber(pesel) && PeselValidator.isDateValid(date, realDay, realMonth, realYear);
  }

  private static validateControlNumber(pesel: string) {
    let sum = Number(pesel[0]) +
      3 * Number(pesel[1]) +
      7 * Number(pesel[2]) +
      9 * Number(pesel[3]) +
      Number(pesel[4]) +
      3 * Number(pesel[5]) +
      7 * Number(pesel[6]) +
      9 * Number(pesel[7]) +
      Number(pesel[8]) +
      3 * Number(pesel[9]);
    sum %= 10;
    sum = 10 - sum;
    sum %= 10;
    return Number(pesel[10]) === sum;
  }

  private static isDateValid(date: Date, realDay: number, realMonth: number, realYear: number) {
    return (date.getFullYear() === realYear && date.getMonth() + 1 === realMonth && date.getDate() === realDay)
      && !PeselValidator.isDateFromFuture(date);
  }

  private static isDateFromFuture(date: Date) {
    return new Date(Date.now()).getTime() < date.getTime();
  }
}
