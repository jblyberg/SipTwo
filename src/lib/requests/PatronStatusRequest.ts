import { RequestMessage } from '../classes/RequestMessage';
import { formatSipRequestDateTime } from '../helpers/DateTimeHelpers';
import { ICommonRequestDto } from '../interfaces';
import { MessageCodes } from '../variables';

export class PatronStatusRequest extends RequestMessage {
  constructor(private commonRequestDto: ICommonRequestDto) {
    super(MessageCodes.PATRON_STATUS_REQUEST);
    this.sequence = commonRequestDto.sequence;
  }

  buildMessage() {
    const transactionDate = formatSipRequestDateTime();

    this.append(this.commonRequestDto.sip2ConnectionOptions.language);
    this.append(transactionDate);
    this.append('AO');
    this.append(this.commonRequestDto.sip2ConnectionOptions.institutionId);
    this.append('|AA');
    this.append(this.commonRequestDto.patronCredentials.patronIdentifier);
    this.append('|AC');
    this.append(this.commonRequestDto.sip2ConnectionOptions.password);
    this.append('|AD');
    this.append(this.commonRequestDto.patronCredentials.password);
  }
}
