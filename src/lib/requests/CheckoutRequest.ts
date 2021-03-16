import { RequestMessage } from '../classes/RequestMessage';
import { ICheckoutRequestDto, ICommonRequestDto } from '../interfaces';
import { MessageCodes } from '../variables';
import { daysFromNow, formatSipRequestDateTime } from '../helpers/DateTimeHelpers';

export class CheckoutRequest extends RequestMessage {
  constructor(private commonRequestDto: ICommonRequestDto, private checkoutRequestDto: ICheckoutRequestDto) {
    super(MessageCodes.CHECKOUT_REQUEST);
    this.sequence = commonRequestDto.sequence;
  }

  buildMessage() {
    const transactionDate = formatSipRequestDateTime();
    const {
      allowRenewals,
      offline,
      offlineDueDateInterval,
      itemIdentifier,
      itemProperties,
      feeAcknowledged,
      cancel,
    } = this.checkoutRequestDto;

    this.append(allowRenewals ? 'Y' : 'N');
    this.append(offline ? 'Y' : 'N');
    this.append(transactionDate);
    this.append(formatSipRequestDateTime(daysFromNow(offlineDueDateInterval)));
    this.append('AO');
    this.append(this.commonRequestDto.patronCredentials.institutionId);
    this.append('|AA');
    this.append(this.commonRequestDto.patronCredentials.patronIdentifier);
    this.append('|AB');
    this.append(itemIdentifier);
    this.append('|AC');
    this.append(this.commonRequestDto.sip2ConnectionOptions.password);

    if (itemProperties) {
      this.append('|CH');
      this.append(itemProperties);
    }

    if (this.commonRequestDto.patronCredentials.password) {
      this.append('|AD');
      this.append(this.commonRequestDto.patronCredentials.password);
    }

    this.append('|BO');
    this.append(feeAcknowledged ? 'Y' : 'N');
    this.append('|BI');
    this.append(cancel ? 'Y' : 'N');
  }
}
