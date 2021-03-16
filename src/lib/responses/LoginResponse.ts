import { ResponseMessage } from '../classes/ResponseMessage';
import { ILoginResponse } from '../interfaces';
import { MessageCodes } from '../variables';
import { intToBool } from '../helpers/TypeTransformers';

export class LoginResponse extends ResponseMessage {
  parse(message: string): ILoginResponse {
    this.identifier = MessageCodes.LOGIN_RESPONSE;

    const data: ILoginResponse = {
      ok: intToBool(message.charAt(2)),
    };

    return data;
  }
}
