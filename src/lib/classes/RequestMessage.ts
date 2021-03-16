import { Message } from './Message';
import { MessageCodes } from '../variables';
import { getChecksum } from '../helpers/ChecksumHelpers';

export class RequestMessage extends Message {
  constructor(identifier: MessageCodes) {
    super();
    this.identifier = identifier;
  }

  getMessage(): string {
    this.message = '';

    if (this.identifier) {
      this.append(this.identifier);
    }

    this.buildMessage();

    if (this.errorDetection) {
      if (this.includeSequenceNumber) {
        this.append(`|AY${this.sequence}`);
      }
      this.append('AZ');

      const checksum = getChecksum(this.message);
      this.append(checksum);
    }

    this.message += this.messageTerminator;

    return this.message;
  }
}
