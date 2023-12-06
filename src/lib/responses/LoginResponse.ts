import { ResponseMessage } from '../classes/ResponseMessage';
import { parseChecksum, verifyChecksum } from '../helpers/ChecksumHelpers';
import { intToBool } from '../helpers/TypeTransformers';
import { ILoginResponse } from '../interfaces';
import { MessageCodes } from '../variables';

export class LoginResponse extends ResponseMessage {
  parse(message: string): ILoginResponse {
    this.identifier = MessageCodes.LOGIN_RESPONSE;

    const data: ILoginResponse = {
      ok: intToBool(message.charAt(2)),
    };

    if (this.errorDetection) {
      data.checksum = parseChecksum(message);
      data.checksumIsValid = verifyChecksum(message);
    }

    return data;
  }
}
