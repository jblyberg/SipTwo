export class Message {
  public errorDetection = true;
  public includeSequenceNumber = true;
  public sequence: number;
  public identifier: string;
  public message: string;
  public messageTerminator = '\r\n';

  append(value: string | number | undefined): void {
    if (value) {
      this.message += value;
    }
  }

  buildMessage(): void {
    throw new Error('buildMessage() needs to be implemented by sub class');
  }
}
