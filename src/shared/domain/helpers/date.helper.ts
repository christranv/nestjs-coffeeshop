export class DateHelper {
    static get UTCNow(): Date {
        return DateHelper.UTCNow
    }

    static addSeconds(date: Date, seconds: number): Date {
        date.setSeconds(date.getSeconds() + seconds);
        return date;
    }
}