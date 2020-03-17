export class PeselDataExtractor {
  static getYear(pesel: string) {
    let year = 10 * Number(pesel[0]) + Number(pesel[1]);
    const month = 10 * Number(pesel[2]) + Number(pesel[3]);
    if (month > 80 && month < 93) {
      year += 1800;
    } else if (month > 0 && month < 13) {
      year += 1900;
    } else if (month > 20 && month < 33) {
      year += 2000;
    } else if (month > 40 && month < 53) {
      year += 2100;
    } else if (month > 60 && month < 73) {
      year += 2200;
    }
    return year;
  }

  static getMonth(pesel: string) {
    let month = 10 * Number(pesel[2]) + Number(pesel[3]);
    if (month > 80 && month < 93) {
      month -= 80;
    } else if (month > 20 && month < 33) {
      month -= 20;
    } else if (month > 40 && month < 53) {
      month -= 40;
    } else if (month > 60 && month < 73) {
      month -= 60;
    }
    return month;
  }

  static getDay(pesel: string) {
    return 10 * Number(pesel[4]) + Number(pesel[5]);
  }
}
