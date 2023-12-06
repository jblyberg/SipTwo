import { RequestMessage } from '../classes/RequestMessage';
import { formatSipRequestDateTime } from '../helpers/DateTimeHelpers';
import { ICommonRequestDto, IRenewAllRequestDto } from '../interfaces';
import { MessageCodes } from '../variables';

export class RenewAllRequest extends RequestMessage {
  constructor(
    private commonRequestDto: ICommonRequestDto,
    private renewAllRequestDto: IRenewAllRequestDto = {},
  ) {
    super(MessageCodes.RENEW_ALL_REQUEST);
    this.sequence = commonRequestDto.sequence;
  }

  buildMessage() {
    const transactionDate = formatSipRequestDateTime();
    const { itemProperties, feeAcknowledged } = this.renewAllRequestDto;

    this.append(transactionDate);
    this.append('AO');
    this.append(this.commonRequestDto.sip2ConnectionOptions.institutionId);
    this.append('|AA');
    this.append(this.commonRequestDto.patronCredentials.patronIdentifier);
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
