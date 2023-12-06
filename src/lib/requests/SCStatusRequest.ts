import { RequestMessage } from '../classes/RequestMessage';
import { ICommonRequestDto, ISCStatusRequestDto } from '../interfaces';
import { MessageCodes, StatusCode } from '../variables';

export class SCStatusRequest extends RequestMessage {
  constructor(
    commonRequestDto: ICommonRequestDto,
    private scStatusRequestDto: ISCStatusRequestDto = {},
  ) {
    super(MessageCodes.SELF_CHECK_STATUS_REQUEST);
    this.sequence = commonRequestDto.sequence;
  }

  buildMessage() {
    const statusCode = this.scStatusRequestDto.statusCode || StatusCode.OK;
    const maxPrintWidth = this.scStatusRequestDto.maxPrintWidth || '000';
    const protocolVersion = this.scStatusRequestDto.protocolVersion || '2.00';

    this.append(statusCode);
    this.append(maxPrintWidth);
    this.append(protocolVersion);
  }
}
