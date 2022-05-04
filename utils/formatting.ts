export function separatedNumber(x: number) {
  return limitDecimalPlacesIfNeeded(x)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function decimalCount(num: number): number {
  // Convert to String
  const numStr = String(num);
  // String Contains Decimal
  if (numStr.includes(".")) {
    return numStr.split(".")[1].length;
  }
  // String Does Not Contain Decimal
  return 0;
}

function limitDecimalPlacesIfNeeded(num: number) {
  const cnt = decimalCount(num);
  if (cnt > 4) {
    return Number(num.toFixed(4));
  }
  return num;
}
