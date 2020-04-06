export function isSameDay(d1: Date | number, d2: Date | number): boolean {
    d1 = new Date(d1);
    d2 = new Date(d2);

    return d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();
}
