import { RequestMessage } from '../classes/RequestMessage';
import { formatSipRequestDateTime } from '../helpers/DateTimeHelpers';
import { IBlockPatronRequestDto, ICommonRequestDto } from '../interfaces';
import { MessageCodes } from '../variables';

export class BlockPatronRequest extends RequestMessage {
  constructor(
    private commonRequestDto: ICommonRequestDto,
    private blockPatronRequestDto: IBlockPatronRequestDto,
  ) {
    super(MessageCodes.BLOCK_PATRON_REQUEST);
    this.sequence = commonRequestDto.sequence;
  }

  buildMessage() {
    const transactionDate = formatSipRequestDateTime();
    const { blockedCardMessage, cardRetained } = this.blockPatronRequestDto;

    this.append(cardRetained ? 'Y' : 'N');
    this.append(transactionDate);
    this.append('AO');
    this.append(this.commonRequestDto.sip2ConnectionOptions.institutionId);
    this.append('|AL');
    this.append(blockedCardMessage);
    this.append('|AA');
    this.append(this.commonRequestDto.patronCredentials.patronIdentifier);
    this.append('|AC');
    this.append(this.commonRequestDto.sip2ConnectionOptions.password);
  }
}
