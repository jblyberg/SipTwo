import { ResponseMessage } from '../classes/ResponseMessage';
import { IFeePaidResponse } from '../interfaces';
import { MessageCodes } from '../variables';
import { parseChecksum, verifyChecksum } from '../helpers/ChecksumHelpers';
import { parseSipResponseDateTime } from '../helpers/DateTimeHelpers';
import { charToBool } from '../helpers/TypeTransformers';
import {
  parseVariable,
  parseVariableMulti,
  parseVariableWithoutDelimeter,
} from '../helpers/ParseVariableHelpers';

export class FeePaidResponse extends ResponseMessage {
  parse(message: string): IFeePaidResponse {
    this.identifier = MessageCodes.FEE_PAID_RESPONSE;

    const data: IFeePaidResponse = {
      paymentAccepted: charToBool(message.charAt(2)),
      transactionDate: parseSipResponseDateTime(message.slice(3, 21)),
      institutionId: parseVariableWithoutDelimeter('AO', message.slice(21)),
      patronIdentifier: parseVariable('AA', message.slice(21)),
      transactionId: parseVariable('BK', message.slice(21)),
      screenMessage: parseVariableMulti('AF', message.slice(21)),
      printLine: parseVariableMulti('AG', message.slice(21)),
    };

    if (this.parseSequence(message) !== '') {
      data.sequence = Number.parseInt(this.parseSequence(message), 10);
    }

    if (this.errorDetection) {
      data.checksum = parseChecksum(message);
      data.validChecksum = verifyChecksum(message);
    }

    return data;
  }
}
