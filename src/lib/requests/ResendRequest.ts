import { RequestMessage } from '../classes/RequestMessage';
import { MessageCodes } from '../variables';

export class ResendRequest extends RequestMessage {
  constructor() {
    super(MessageCodes.RESEND_REQUEST);
  }

  buildMessage() {
    return;
  }
}
