export class CurrencyType {
  public static types = {
    US_DOLLAR: 'USD',
    CANADIAN_DOLLAR: 'CAD',
    POUND_STERLING: 'GBP',
    YEN: 'JPY',
    EURO: 'EUR',
  };

  public static parse(value: string): string | undefined {
    const values = Object.keys(CurrencyType.types).map((key) => CurrencyType.types[key]);
    if (values.includes(value)) {
      return value;
    }
    return;
  }
}
