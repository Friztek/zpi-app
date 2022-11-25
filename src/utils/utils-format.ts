import { format } from "date-fns";

export function numberToMoneyString(value: number): string {
    return value.toLocaleString('ru-RU').replace(',', '.');
}

export function dateToOffsetDate(value: Date | undefined): string | undefined{
    console.log(format(value!, "yyyy-MM-ddx"));
    return value === undefined ? undefined : format(value, "yyyy-MM-ddx");
}
