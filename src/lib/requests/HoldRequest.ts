import { RequestMessage } from '../classes/RequestMessage';
import { formatSipRequestDateTime } from '../helpers/DateTimeHelpers';
import { ICommonRequestDto, IHoldRequestDto } from '../interfaces';
import { HoldRequestMode, MessageCodes } from '../variables';

export class HoldRequest extends RequestMessage {
  constructor(private commonRequestDto: ICommonRequestDto, private holdRequestDto: IHoldRequestDto) {
    super(MessageCodes.HOLD_REQUEST);
    this.sequence = commonRequestDto.sequence;
  }

  buildMessage() {
    const transactionDate = formatSipRequestDateTime();
    const {
      mode,
      holdType,
      itemIdentifier,
      titleIdentifier,
      pickupLocation,
      expirationDate,
      feeAcknowledged,
    } = this.holdRequestDto;

    if (!itemIdentifier && !titleIdentifier) {
      throw new Error('Must provide either itemIdentifier or titleIdentifier or both.');
    }

    this.append(HoldRequestMode[mode] || '+');
    this.append(transactionDate);

    if (expirationDate) {
      this.append('BW');
      this.append(formatSipRequestDateTime(expirationDate));
    }

    if (pickupLocation) {
      this.append('|BS');
      this.append(pickupLocation);
    }

    if (holdType) {
      this.append('|BY');
      this.append(holdType);
    }

    this.append('|AO');
    this.append(this.commonRequestDto.sip2ConnectionOptions.institutionId);
    this.append('|AA');
    this.append(this.commonRequestDto.patronCredentials.patronIdentifier);

    if (this.commonRequestDto.patronCredentials.password) {
      this.append('|AD');
      this.append(this.commonRequestDto.patronCredentials.password);
    }

    if (itemIdentifier) {
      this.append('|AB');
      this.append(itemIdentifier);
    }

    if (titleIdentifier) {
      this.append('|AJ');
      this.append(titleIdentifier);
    }

    if (this.commonRequestDto.sip2ConnectionOptions.password) {
      this.append('|AC');
      this.append(this.commonRequestDto.sip2ConnectionOptions.password);
    }

    this.append('|BO');
    this.append(feeAcknowledged ? 'Y' : 'N');
  }
}
