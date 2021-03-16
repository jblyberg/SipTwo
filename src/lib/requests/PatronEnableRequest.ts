import { RequestMessage } from '../classes/RequestMessage';
import { formatSipRequestDateTime } from '../helpers/DateTimeHelpers';
import { ICommonRequestDto } from '../interfaces';
import { MessageCodes } from '../variables';

export class PatronEnableRequest extends RequestMessage {
  constructor(private commonRequestDto: ICommonRequestDto) {
    super(MessageCodes.PATRON_ENABLE_REQUEST);
    this.sequence = commonRequestDto.sequence;
  }

  buildMessage() {
    const transactionDate = formatSipRequestDateTime();

    this.append(transactionDate);
    this.append('AO');
    this.append(this.commonRequestDto.sip2ConnectionOptions.institutionId);
    this.append('|AA');
    this.append(this.commonRequestDto.patronCredentials.patronIdentifier);
    if (this.commonRequestDto.sip2ConnectionOptions.password) {
      this.append('|AC');
      this.append(this.commonRequestDto.sip2ConnectionOptions.password);
    }
    if (this.commonRequestDto.patronCredentials.password) {
      this.append('|AD');
      this.append(this.commonRequestDto.patronCredentials.password);
    }
  }
}
