export class DateHelper {
    static get UTCNow(): Date {
        return new Date()
    }

    static addSeconds(date: Date, seconds: number): Date {
        date.setSeconds(date.getSeconds() + seconds);
        return date;
    }
}