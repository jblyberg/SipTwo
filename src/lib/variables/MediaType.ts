export class MediaType {
  public static types = {
    OTHER: '000',
    BOOK: '001',
    MAGAZINE: '002',
    BOUND_JOURNAL: '003',
    AUDIO_TAPE: '004',
    VIDEO_TAPE: '005',
    CD_CDROM: '006',
    DISKETTE: '007',
    BOOK_WITH_DISKETTE: '008',
    BOOK_WITH_CD: '009',
    BOOK_WITH_AUDIO_TAPE: '010',
  };

  public static parse(value: string): string {
    const values = Object.keys(MediaType.types).map((key) => MediaType.types[key]);
    if (values.includes(value)) {
      return value;
    }
    return '';
  }
}
