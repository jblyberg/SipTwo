import { RequestMessage } from '../classes/RequestMessage';
import { formatSipRequestDateTime } from '../helpers/DateTimeHelpers';
import { ICheckinRequestDto, ICommonRequestDto } from '../interfaces';
import { MessageCodes } from '../variables';

export class CheckInRequest extends RequestMessage {
  constructor(
    private commonRequestDto: ICommonRequestDto,
    private checkinRequestDto: ICheckinRequestDto,
  ) {
    super(MessageCodes.CHECKIN_REQUEST);
    this.sequence = commonRequestDto.sequence;
  }

  buildMessage() {
    const transactionDate = formatSipRequestDateTime();
    const { password, institutionId } = this.commonRequestDto.sip2ConnectionOptions;
    const { offline, returnDate, location, itemIdentifier, itemProperties, cancel } = this.checkinRequestDto;

    this.append(offline ? 'Y' : 'N');
    this.append(transactionDate);
    if (returnDate) {
      this.append(formatSipRequestDateTime(returnDate));
    }
    this.append('AP');
    this.append(location);
    this.append('|AO');
    this.append(institutionId);
    this.append('|AB');
    this.append(itemIdentifier);
    this.append('|AC');
    this.append(password || '');
    if (itemProperties) {
      this.append('|CH');
      this.append(itemProperties);
    }
    this.append('|BI');
    this.append(cancel ? 'Y' : 'N');
    if (this.commonRequestDto.patronCredentials.password) {
      this.append('|AD');
      this.append(this.commonRequestDto.patronCredentials.password);
    }
  }
}
