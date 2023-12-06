export class FeeType {
  public static types = {
    OTHER_UNKNOWN: '01',
    ADMINISTRATIVE: '02',
    DAMAGE: '03',
    OVERDUE: '04',
    PROCESSING: '05',
    RENTAL: '06',
    REPLACEMENT: '07',
    COMPUTER_ACCESS_CHARGE: '08',
    HOLD_FEE: '09',
  };

  public static parse(value: string): string {
    const values = Object.keys(FeeType.types).map((key) => FeeType.types[key]);
    if (values.includes(value)) {
      return value;
    }
    return '';
  }
}
