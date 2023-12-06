export class SecurityMarker {
  public static types = {
    OTHER: '00',
    NONE: '01',
    TATTLE_TAPE_SECURITY_STRIP_3M: '02',
    WHISPER_TAPE_3M: '03',
  };

  public static parse(value: string): string {
    const values = Object.keys(SecurityMarker.types).map((key) => SecurityMarker.types[key]);
    if (values.includes(value)) {
      return value;
    }
    return '';
  }
}
