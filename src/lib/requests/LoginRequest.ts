import { RequestMessage } from '../classes/RequestMessage';
import { ICommonRequestDto } from '../interfaces';
import { MessageCodes } from '../variables';

export class LoginRequest extends RequestMessage {
  constructor(private commonRequestDto: ICommonRequestDto) {
    super(MessageCodes.LOGIN_REQUEST);
    this.sequence = commonRequestDto.sequence;
  }

  buildMessage() {
    const UIDalgorithm = '0';
    const PWDalgorithm = '0';
    const { username, password, institutionId } = this.commonRequestDto.sip2ConnectionOptions;

    this.append(UIDalgorithm);
    this.append(PWDalgorithm);

    if (username) {
      this.append('CN');
      this.append(username);
    }

    if (password) {
      this.append('|CO');
      this.append(password);
    }

    this.append('|CP');
    this.append(institutionId);
  }
}
