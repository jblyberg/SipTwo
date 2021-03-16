import { RequestMessage } from '../classes/RequestMessage';
import { MessageCodes } from '../variables';
import { ICommonRequestDto, IRenewRequestDto } from '../interfaces';
import { daysFromNow, formatSipRequestDateTime } from '../helpers/DateTimeHelpers';

export class RenewRequest extends RequestMessage {
  constructor(private commonRequestDto: ICommonRequestDto, private renewRequestDto: IRenewRequestDto) {
    super(MessageCodes.RENEW_REQUEST);
    this.sequence = commonRequestDto.sequence;
  }

  buildMessage() {
    const transactionDate = formatSipRequestDateTime();
    const {
      offline,
      offlineDueDateInterval,
      itemIdentifier,
      thirdParty,
      itemProperties,
      feeAcknowledged,
    } = this.renewRequestDto;

    this.append(thirdParty ? 'Y' : 'N');
    this.append(offline ? 'Y' : 'N');
    this.append(transactionDate);
    this.append(formatSipRequestDateTime(daysFromNow(offlineDueDateInterval)));
    this.append('AO');
    this.append(this.commonRequestDto.sip2ConnectionOptions.institutionId);
    this.append('|AA');
    this.append(this.commonRequestDto.patronCredentials.patronIdentifier);

    if (this.commonRequestDto.patronCredentials.password) {
      this.append('|AD');
      this.append(this.commonRequestDto.patronCredentials.password);
    }

    this.append('|AB');
    this.append(itemIdentifier);
    this.append('|AC');
    this.append(this.commonRequestDto.sip2ConnectionOptions.password);

    if (itemProperties) {
      this.append('|CH');
      this.append(itemProperties);
    }

    if (feeAcknowledged) {
      this.append('|BO');
      this.append(feeAcknowledged ? 'Y' : 'N');
    }
  }
}
