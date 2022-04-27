import { ResponseMessage } from '../classes/ResponseMessage';
import { IRequestSCResendResponse } from '../interfaces';
import { MessageCodes } from '../variables';
import { intToBool } from '../helpers/TypeTransformers';
import { parseChecksum, verifyChecksum } from '../helpers/ChecksumHelpers';

export class RequestSCResendResponse extends ResponseMessage {
  parse(message: string): IRequestSCResendResponse {
    this.identifier = MessageCodes.REQUEST_SC_RESEND_RESPONSE;

    const data: IRequestSCResendResponse = {
      ok: intToBool(message.charAt(2)),
    };

    if (this.errorDetection) {
      data.checksum = parseChecksum(message);
      data.checksumIsValid = verifyChecksum(message);
    }

    return data;
  }
}
