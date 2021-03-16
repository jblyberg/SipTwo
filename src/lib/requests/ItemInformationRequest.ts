import { RequestMessage } from '../classes/RequestMessage';
import { ICommonRequestDto } from '../interfaces';
import { MessageCodes } from '../variables';
import { formatSipRequestDateTime } from '../helpers/DateTimeHelpers';

export class ItemInformationRequest extends RequestMessage {
  private transactionDate = formatSipRequestDateTime();

  constructor(private commonRequestDto: ICommonRequestDto, private itemIdentifier: string) {
    super(MessageCodes.ITEM_INFORMATION_REQUEST);
    this.sequence = commonRequestDto.sequence;
  }

  buildMessage() {
    this.append(this.transactionDate);
    this.append('AO');
    this.append(this.commonRequestDto.sip2ConnectionOptions.institutionId);
    this.append('|AB');
    this.append(this.itemIdentifier);
    if (this.commonRequestDto.sip2ConnectionOptions.password) {
      this.append('|AC');
      this.append(this.commonRequestDto.sip2ConnectionOptions.password);
    }
  }
}
