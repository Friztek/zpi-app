import { format } from "date-fns";

export function getPrecisionByCategory(category: string): number {
  return category === "currency" ? 2 : category === "crypto" ? 8 : 6;
}

export function numberToMoneyString(value: number, toFixed?: number | undefined): string {

 console.log("toFixed", toFixed);
  const fixedValue = toFixed ?? 2;
  const splittedValue = value.toFixed(fixedValue).split(".");
  const wholeNumberPart = Number(splittedValue[0]);
  const decimalPart = splittedValue[1];
  console.log(wholeNumberPart, wholeNumberPart.toString());
  if (splittedValue.length > 1) {
    return wholeNumberPart.toLocaleString("ru-RU").concat(".").concat(decimalPart);
  }
  return wholeNumberPart.toLocaleString("ru-RU");
}

export function dateToOffsetDate(value: Date | undefined): string | undefined {
  console.log(format(value!, "yyyy-MM-ddx"));
  return value === undefined ? undefined : format(value, "yyyy-MM-ddx");
}
