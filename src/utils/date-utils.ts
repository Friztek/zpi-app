import { lastDayOfMonth, sub } from "date-fns";

export function lastDayOfPreviousMonth() {
    const now = new Date();
    const sameDayInPreviousMonth = sub(now, { months: 1 });
    return lastDayOfMonth(sameDayInPreviousMonth);
};