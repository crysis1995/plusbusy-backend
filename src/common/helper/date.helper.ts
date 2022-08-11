import dayjs from 'dayjs';

export class DateHelper {
    static getDate(value: Date) {
        return dayjs(value).format('YYYY-MM-DD');
    }
}
