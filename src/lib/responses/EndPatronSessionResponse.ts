import { ResponseMessage } from '../classes/ResponseMessage';
import { parseChecksum, verifyChecksum } from '../helpers/ChecksumHelpers';
import { parseSipResponseDateTime } from '../helpers/DateTimeHelpers';
import {
  parseVariable,
  parseVariableMulti,
  parseVariableWithoutDelimeter,
} from '../helpers/ParseVariableHelpers';
import { charToBool } from '../helpers/TypeTransformers';
import { IEndPatronSessionResponse } from '../interfaces';
import { MessageCodes } from '../variables';

export class EndPatronSessionResponse extends ResponseMessage {
  parse(message: string): IEndPatronSessionResponse {
    this.identifier = MessageCodes.END_PATRON_SESSION_RESPONSE;

    const data: IEndPatronSessionResponse = {
      endSession: charToBool(message.charAt(2)),
      transactionDate: parseSipResponseDateTime(message.slice(3, 21)),
      institutionId: parseVariableWithoutDelimeter('AO', message.slice(21)) || '',
      patronIdentifier: parseVariable('AA', message.slice(21)) || '',
      screenMessage: parseVariableMulti('AF', message.slice(21)),
      printLine: parseVariableMulti('AG', message.slice(21)),
    };

    if (this.parseSequence(message) !== '') {
      data.sequence = Number.parseInt(this.parseSequence(message), 10);
    }

    if (this.errorDetection) {
      data.checksum = parseChecksum(message);
      data.checksumIsValid = verifyChecksum(message);
    }

    return data;
  }
}
